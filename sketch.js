// Space Cocoa - A journey to bring hot cocoa to Neptune
// Refactored version with modular architecture

// Game objects
var ship;
var asteroids = [];
var lasers = [];

// Game systems
var sceneManager;
var dialogSystem;
var gameState;
var particleSystem;
var soundManager;

// Assets
let cookieFont;
let cookieThinFont;
let images = {};

// Stun state
let stun = false;
let stunTimer = 0;
let hitCooldownTimer = 0;
let hitFlashTimer = 0;
let hitShakeTimer = 0;

function preload() {
  loadAssets();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);

  // Initialize game systems
  sceneManager = new SceneManager();
  dialogSystem = new DialogSystem();
  gameState = new GameState();
  particleSystem = new ParticleSystem();
  soundManager = new SoundManager();

  // Initialize game objects
  ship = new Ship();
  for (let i = 0; i < CONFIG.game.asteroidCount; i++) {
    asteroids.push(new Asteroid());
  }

  gameState.startTime = millis();
  soundManager.playMusic();
}

function draw() {
  background(0, CONFIG.game.fadeAlpha);

  // Handle pause
  if (gameState.isPaused) {
    gameState.renderPauseMenu();
    return;
  }

  // Handle game over
  if (gameState.isGameOver) {
    gameState.renderGameOver();
    return;
  }

  updateHitFeedback();

  // Route to current scene
  const scene = sceneManager.getCurrentScene();
  const shouldShake = scene === CONFIG.scenes.ASTEROID && hitShakeTimer > 0;

  if (shouldShake) {
    const shakeStrength = map(
      hitShakeTimer,
      0,
      CONFIG.game.hitShakeDuration,
      0,
      CONFIG.game.hitShakeIntensity
    );
    push();
    translate(random(-shakeStrength, shakeStrength), random(-shakeStrength, shakeStrength));
  }

  // Update and render particles
  particleSystem.update();
  particleSystem.render();

  switch(scene) {
    case CONFIG.scenes.TITLE:
      renderTitleScene();
      break;
    case CONFIG.scenes.NEPTUNE:
      renderPlanetScene('neptune', images.Neptune, true, 'neptuneReturn');
      break;
    case CONFIG.scenes.ASTEROID:
      renderAsteroidScene();
      break;
    case CONFIG.scenes.URANUS:
      renderPlanetScene('uranus', images.Uranus, false, null, 'milk');
      break;
    case CONFIG.scenes.SATURN:
      renderPlanetScene('saturn', images.Saturn, false, null, 'cocoa',
        { x: width - 800, y: height/2 - 400 },
        { x: width - 1000, y: height/2 - 200, w: 200, h: 200 });
      break;
    case CONFIG.scenes.EARTH:
      renderPlanetScene('earth', images.Earth, false, null, 'cream');
      break;
    case CONFIG.scenes.SUN:
      renderSunScene();
      break;
    case CONFIG.scenes.EARTH_RETURN:
      renderReturnScene('earthReturn', images.Earth);
      break;
    case CONFIG.scenes.SATURN_RETURN:
      renderReturnScene('saturnReturn', images.Saturn,
        { x: width - 800, y: height/2 - 400 });
      break;
    case CONFIG.scenes.URANUS_RETURN:
      renderReturnScene('uranusReturn', images.Uranus);
      break;
    case CONFIG.scenes.NEPTUNE_RETURN:
      renderNeptuneReturnScene();
      break;
  }

  if (shouldShake) {
    pop();
  }

  renderHitFlash();

  // Render UI
  gameState.renderUI();

  // Show GO prompt
  if (sceneManager.isReadyToGo() && sceneManager.getCurrentScene() != CONFIG.scenes.TITLE) {
    push();
    fill(255);
    textFont(cookieFont);
    textSize(32);
    text(CONFIG.ui.goPrompt, width/2, 50);
    pop();
  }
}

function renderTitleScene() {
  sceneManager.setReadyToGo(true);

  push();
  fill(255);
  textFont(cookieFont);
  textSize(56);
  text(CONFIG.ui.title, windowWidth/2, 100);

  textFont(cookieThinFont);
  textSize(24);
  text(CONFIG.ui.controls, width/2, height - 200);
  text(CONFIG.ui.fireHint, width/2, height - 160);
  text(CONFIG.ui.pauseHint, width/2, height - 120);
  pop();

  updateShip();

  if (sceneManager.isNextSceneRequested()) {
    sceneManager.goToNextScene();
    resetSceneState();
  }
}

function renderPlanetScene(planetKey, planetImage, trembles, nextDialogKey = null, ingredient = null, planetPos = null, triggerZone = null) {
  // Default positions
  if (!planetPos) {
    planetPos = { x: width - 300, y: height/2 - 100 };
  }

  if (!triggerZone) {
    triggerZone = { x: width - 600, y: height/2 - 100, w: 200, h: 200 };
  }

  // Trembling effect for Neptune
  let trembleX = 0, trembleY = 0;
  if (trembles) {
    trembleX = random(-1, 1);
    trembleY = random(-1, 1);
  }

  // Draw planet
  image(planetImage, planetPos.x + trembleX, planetPos.y + trembleY);

  // Show trigger box if dialog not started
  if (!sceneManager.isReadyToGo() && !dialogSystem.isActive()) {
    dialogSystem.renderTriggerBox(triggerZone.x, triggerZone.y, triggerZone.w, triggerZone.h);
  }

  // Check if ship enters trigger zone
  if (ship.pos.x > triggerZone.x && ship.pos.x < triggerZone.x + triggerZone.w &&
      ship.pos.y > triggerZone.y && ship.pos.y < triggerZone.y + triggerZone.h) {

    if (!sceneManager.isReadyToGo() && !dialogSystem.isActive()) {
      dialogSystem.start(planetKey);
    }

    // Render dialog
    dialogSystem.render(ship.pos, planetPos, { x: trembleX, y: trembleY });

    // Check if dialog complete
    if (dialogSystem.isComplete()) {
      sceneManager.setReadyToGo(true);
      dialogSystem.end();

      // Collect ingredient if specified
      if (ingredient) {
        gameState.collectIngredient(ingredient);
      }
    }
  }

  updateShip();

  if (sceneManager.isNextSceneRequested()) {
    sceneManager.goToAsteroidScene();
    resetSceneState();
  }
}

function renderAsteroidScene() {
  sceneManager.setReadyToGo(true);
  handleStun();

  // Update asteroids
  for (let i = 0; i < asteroids.length; i++) {
    if (ship.hits(asteroids[i]) && hitCooldownTimer <= 0) {
      triggerShipHit(asteroids[i]);
    }
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }

  // Update lasers
  for (let i = lasers.length - 1; i >= 0; i--) {
    lasers[i].render();
    lasers[i].update();

    if (lasers[i].offscreen()) {
      lasers.splice(i, 1);
    } else {
      for (let j = asteroids.length - 1; j >= 0; j--) {
        if (lasers[i].hits(asteroids[j])) {
          // Create explosion
          particleSystem.addExplosion(asteroids[j].pos.x, asteroids[j].pos.y, 15);
          soundManager.playExplosion();
          gameState.incrementAsteroidsDestroyed();

          if (asteroids[j].r > 10) {
            var newAsteroids = asteroids[j].breakup();
            asteroids = asteroids.concat(newAsteroids);
          }
          asteroids.splice(j, 1);
          lasers.splice(i, 1);
          break;
        }
      }
    }
  }

  updateShip();

  if (sceneManager.isNextSceneRequested()) {
    if (max(sceneManager.sceneHistory) > -1) {
      sceneManager.goToScene(max(sceneManager.sceneHistory) + 1);
    } else {
      sceneManager.goToNextScene();
    }
    resetSceneState();
  }
}

function renderSunScene() {
  image(images.Sun, width/2, 100);

  const triggerZone = { x: width/2 + 420, y: height/2, w: 200, h: 200 };

  // Check if ship enters trigger zone
  if (ship.pos.x > triggerZone.x && ship.pos.x < triggerZone.x + triggerZone.w &&
      ship.pos.y > triggerZone.y && ship.pos.y < triggerZone.y + triggerZone.h) {

    if (!sceneManager.isReadyToGo() && !dialogSystem.isActive()) {
      dialogSystem.start('sun');
    }

    const dialogData = dialogSystem.getCurrentText();
    if (dialogData) {
      push();
      fill(255);
      textFont(cookieFont);
      textSize(20);

      if (dialogSystem.getCurrentStep() === 0) {
        text(CONFIG.ui.progressHint, width/2, 50);
      }

      if (dialogData.speaker === 'system') {
        push();
        fill(255);
        textSize(24);
        text(dialogData.text, width/2, 100);
        pop();

        // Show cocoa image on step 5
        if (dialogSystem.getCurrentStep() === 5) {
          image(images.onlycocoa, ship.pos.x - 40, ship.pos.y - 50);
        }
      } else if (dialogData.speaker === 'ship') {
        text(dialogData.text, ship.pos.x, ship.pos.y - (dialogSystem.getCurrentStep() === 6 ? 150 : 50));
        if (dialogSystem.getCurrentStep() === 6) {
          gameState.setHoldingCocoa(true);
        }
      } else {
        text(dialogData.text, width - 540, height/2 - 150);
      }
      pop();
    }

    if (dialogSystem.isComplete()) {
      sceneManager.setReadyToGo(true);
      dialogSystem.end();
      gameState.collectIngredient('heated');
    }
  }

  updateShip();
  image(images.Sunlight, width/2, 100);

  if (sceneManager.isNextSceneRequested()) {
    sceneManager.goToAsteroidScene();
    resetSceneState();
  }
}

function renderReturnScene(dialogKey, planetImage, planetPos = null) {
  sceneManager.setReadyToGo(true);

  if (!planetPos) {
    planetPos = { x: width - 300, y: height/2 - 100 };
  }

  image(planetImage, planetPos.x, planetPos.y);

  if (ship.pos.x > width/2) {
    push();
    fill(255);
    textFont(cookieFont);
    textSize(20);
    const dialog = CONFIG.dialogs[dialogKey];
    if (dialog && dialog[0]) {
      text(dialog[0].text, planetPos.x - 260, planetPos.y - 150);
    }
    pop();
  }

  updateShip();

  if (sceneManager.isNextSceneRequested()) {
    sceneManager.goToAsteroidScene();
    resetSceneState();
  }
}

function renderNeptuneReturnScene() {
  let trembleX = random(-1, 1);
  let trembleY = random(-1, 1);
  image(images.Neptune, width - 300 + trembleX, height/2 - 100 + trembleY);

  const triggerZone = { x: width - 600, y: height/2 - 100, w: 200, h: 200 };

  if (!sceneManager.isReadyToGo() && !dialogSystem.isActive()) {
    dialogSystem.renderTriggerBox(triggerZone.x, triggerZone.y, triggerZone.w, triggerZone.h);
  }

  if (ship.pos.x > triggerZone.x && ship.pos.x < triggerZone.x + triggerZone.w &&
      ship.pos.y > triggerZone.y && ship.pos.y < triggerZone.y + triggerZone.h) {

    if (!sceneManager.isReadyToGo() && !dialogSystem.isActive()) {
      dialogSystem.start('neptuneReturn');
    }

    dialogSystem.render(ship.pos, { x: width - 300, y: height/2 - 50 }, { x: trembleX, y: trembleY });

    if (dialogSystem.isComplete()) {
      sceneManager.setReadyToGo(true);
      gameState.win();
      dialogSystem.end();
    }
  }

  updateShip();

  if (sceneManager.isNextSceneRequested()) {
    sceneManager.goToNextScene();
    resetSceneState();
  }
}

function updateShip() {
  ship.render();
  ship.turn();
  ship.update();
  ship.edges();

  // Add thruster particles when boosting
  if (ship.isBoosting && frameCount % 3 === 0) {
    const angle = ship.heading + PI;
    const particleX = ship.pos.x + cos(angle) * ship.r;
    const particleY = ship.pos.y + sin(angle) * ship.r;
    particleSystem.addTrail(particleX, particleY, color(255, 150, 50));
  }
}

function getFrameDeltaMs() {
  if (typeof window.deltaTime === 'number' && isFinite(window.deltaTime)) {
    return window.deltaTime;
  }
  return 1000 / 60;
}

function updateHitFeedback() {
  const frameDelta = getFrameDeltaMs();

  if (hitCooldownTimer > 0) {
    hitCooldownTimer = max(0, hitCooldownTimer - frameDelta);
  }
  if (hitFlashTimer > 0) {
    hitFlashTimer = max(0, hitFlashTimer - frameDelta);
  }
  if (hitShakeTimer > 0) {
    hitShakeTimer = max(0, hitShakeTimer - frameDelta);
  }
}

function renderHitFlash() {
  if (hitFlashTimer <= 0) {
    return;
  }

  push();
  noStroke();
  const alpha = map(
    hitFlashTimer,
    0,
    CONFIG.game.hitFlashDuration,
    0,
    CONFIG.game.hitFlashAlpha
  );
  fill(255, 40, 40, alpha);
  rect(0, 0, width, height);
  pop();
}

function triggerShipHit(asteroid) {
  stun = true;
  stunTimer = 0;
  hitCooldownTimer = CONFIG.game.hitCooldownDuration;
  hitFlashTimer = CONFIG.game.hitFlashDuration;
  hitShakeTimer = CONFIG.game.hitShakeDuration;
  gameState.takeDamage(CONFIG.game.hitDamage);
  soundManager.playHit();
  particleSystem.addExplosion(ship.pos.x, ship.pos.y, 10, color(255, 100, 100));

  const knockback = p5.Vector.sub(ship.pos, asteroid.pos);
  if (knockback.magSq() > 0) {
    knockback.setMag(CONFIG.game.hitKnockbackForce);
    ship.vel.add(knockback);
  }
}

function handleStun() {
  if (stun) {
    const frameDelta = getFrameDeltaMs();
    stunTimer += frameDelta;
    if (stunTimer >= CONFIG.game.stunDuration) {
      stun = false;
      stunTimer = 0;
    }
  }
}

function resetSceneState() {
  sceneManager.setReadyToGo(false);
  dialogSystem.end();
  sceneManager.reset();
  resetHitFeedback();
}

function resetHitFeedback() {
  stun = false;
  stunTimer = 0;
  hitCooldownTimer = 0;
  hitFlashTimer = 0;
  hitShakeTimer = 0;
}

function keyReleased() {
  ship.setRotation(0);
  ship.boosting(false);
}

function keyPressed() {
  // Game controls
  if (key === ' ') {
    if (dialogSystem.isActive()) {
      dialogSystem.next();
    }
  } else if (keyCode === RIGHT_ARROW) {
    ship.setRotation(CONFIG.game.shipRotationSpeed);
  } else if (keyCode === LEFT_ARROW) {
    ship.setRotation(-CONFIG.game.shipRotationSpeed);
  } else if (keyCode === UP_ARROW) {
    ship.boosting(true);
  }

  // Pause
  if (key === 'p' || key === 'P') {
    if (!gameState.isGameOver) {
      gameState.togglePause();
      if (gameState.isPaused) {
        soundManager.pauseMusic();
      } else {
        soundManager.resumeMusic();
      }
    }
  }

  // Restart
  if (key === 'r' || key === 'R') {
    restartGame();
  }
}

function restartGame() {
  // Reset all systems
  gameState.restart();
  sceneManager = new SceneManager();
  dialogSystem = new DialogSystem();
  particleSystem.clear();

  // Reset game objects
  ship = new Ship();
  asteroids = [];
  lasers = [];
  for (let i = 0; i < CONFIG.game.asteroidCount; i++) {
    asteroids.push(new Asteroid());
  }

  resetHitFeedback();

  gameState.startTime = millis();
  soundManager.playMusic();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function loadAssets() {
  // Load fonts
  cookieFont = loadFont('assets/fonts/CookieRun_bold.ttf');
  cookieThinFont = loadFont('assets/fonts/CookieRun.ttf');

  // Load images
  images.Star = loadImage('assets/images/Star.png');
  images.starcocoa = loadImage('assets/images/starcocoa.png');
  images.Saturn = loadImage('assets/images/Saturn.png');
  images.Neptune = loadImage('assets/images/Neptune.png');
  images.Uranus = loadImage('assets/images/Uranus.png');
  images.Earth = loadImage('assets/images/Earth.png');
  images.Sun = loadImage('assets/images/Sun.png');
  images.Sunlight = loadImage('assets/images/Sunlight.png');
  images.onlycocoa = loadImage('assets/images/onlycocoa.png');
  images.hurtstar = loadImage('assets/images/hurtstar.png');

  // Load sounds (when available)
  // soundManager.loadSounds();

  // Setup touch controls after DOM loads
  setupTouchControls();
}

// Touch control setup for mobile devices
function setupTouchControls() {
  const touchLeft = document.getElementById('touch-left');
  const touchRight = document.getElementById('touch-right');
  const touchForward = document.getElementById('touch-forward');
  const touchFire = document.getElementById('touch-fire');

  if (touchLeft) {
    touchLeft.addEventListener('touchstart', (e) => {
      e.preventDefault();
      ship.setRotation(-CONFIG.game.shipRotationSpeed);
    });
    touchLeft.addEventListener('touchend', (e) => {
      e.preventDefault();
      ship.setRotation(0);
    });
  }

  if (touchRight) {
    touchRight.addEventListener('touchstart', (e) => {
      e.preventDefault();
      ship.setRotation(CONFIG.game.shipRotationSpeed);
    });
    touchRight.addEventListener('touchend', (e) => {
      e.preventDefault();
      ship.setRotation(0);
    });
  }

  if (touchForward) {
    touchForward.addEventListener('touchstart', (e) => {
      e.preventDefault();
      ship.boosting(true);
    });
    touchForward.addEventListener('touchend', (e) => {
      e.preventDefault();
      ship.boosting(false);
    });
  }

  if (touchFire) {
    touchFire.addEventListener('touchstart', (e) => {
      e.preventDefault();
      if (dialogSystem.isActive()) {
        dialogSystem.next();
      }
    });
  }
}
