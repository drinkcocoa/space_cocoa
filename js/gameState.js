// Game State Manager
class GameState {
  constructor() {
    this.score = 0;
    this.health = 100;
    this.maxHealth = 100;
    this.asteroidsDestroyed = 0;
    this.startTime = 0;
    this.isPaused = false;
    this.isGameOver = false;
    this.hasWon = false;

    // Ingredients collected
    this.ingredients = {
      milk: false,
      cocoa: false,
      cream: false,
      heated: false
    };

    this.holdingCocoa = false;
  }

  addScore(points) {
    this.score += points;
  }

  takeDamage(amount) {
    this.health = max(0, this.health - amount);
    if (this.health <= 0) {
      this.gameOver();
    }
  }

  heal(amount) {
    this.health = min(this.maxHealth, this.health + amount);
  }

  incrementAsteroidsDestroyed() {
    this.asteroidsDestroyed++;
    this.addScore(100);
  }

  collectIngredient(type) {
    if (this.ingredients.hasOwnProperty(type)) {
      this.ingredients[type] = true;
    }
  }

  hasAllIngredients() {
    return this.ingredients.milk &&
           this.ingredients.cocoa &&
           this.ingredients.cream &&
           this.ingredients.heated;
  }

  setHoldingCocoa(holding) {
    this.holdingCocoa = holding;
  }

  isHoldingCocoa() {
    return this.holdingCocoa;
  }

  togglePause() {
    this.isPaused = !this.isPaused;
  }

  pause() {
    this.isPaused = true;
  }

  unpause() {
    this.isPaused = false;
  }

  gameOver() {
    this.isGameOver = true;
  }

  win() {
    this.hasWon = true;
    this.isGameOver = true;
  }

  restart() {
    this.score = 0;
    this.health = this.maxHealth;
    this.asteroidsDestroyed = 0;
    this.startTime = millis();
    this.isPaused = false;
    this.isGameOver = false;
    this.hasWon = false;
    this.ingredients = {
      milk: false,
      cocoa: false,
      cream: false,
      heated: false
    };
    this.holdingCocoa = false;
  }

  getPlayTime() {
    return millis() - this.startTime;
  }

  getPlayTimeFormatted() {
    const totalSeconds = floor(this.getPlayTime() / 1000);
    const minutes = floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  renderUI() {
    push();
    fill(255);
    textFont(Cookie_thin_font);
    textSize(18);
    textAlign(LEFT);

    // Score
    text(`Score: ${this.score}`, 20, 30);

    // Health bar
    text('Health:', 20, 60);
    push();
    stroke(255);
    noFill();
    rect(90, 48, 100, 15);
    fill(255, 0, 0);
    noStroke();
    const healthWidth = map(this.health, 0, this.maxHealth, 0, 100);
    rect(90, 48, healthWidth, 15);
    pop();

    // Ingredients
    let ingredientY = 90;
    text('Ingredients:', 20, ingredientY);
    ingredientY += 25;

    const ingredientSymbols = {
      milk: '🥛',
      cocoa: '🍫',
      cream: '☁️',
      heated: '🔥'
    };

    const ingredientNames = {
      milk: 'Milk',
      cocoa: 'Cocoa',
      cream: 'Cream',
      heated: 'Heated'
    };

    for (let key in this.ingredients) {
      const collected = this.ingredients[key];
      push();
      fill(collected ? 255 : 100);
      text(`${ingredientNames[key]}: ${collected ? '✓' : '✗'}`, 30, ingredientY);
      pop();
      ingredientY += 20;
    }

    // Time
    textAlign(RIGHT);
    text(`Time: ${this.getPlayTimeFormatted()}`, width - 20, 30);

    pop();
  }

  renderPauseMenu() {
    if (!this.isPaused) return;

    push();
    // Semi-transparent overlay
    fill(0, 200);
    rect(0, 0, width, height);

    // Pause text
    fill(255);
    textFont(Cookie_font);
    textSize(48);
    textAlign(CENTER);
    text('PAUSED', width / 2, height / 2 - 50);

    textFont(Cookie_thin_font);
    textSize(24);
    text('Press P to resume', width / 2, height / 2 + 20);
    text('Press R to restart', width / 2, height / 2 + 60);

    pop();
  }

  renderGameOver() {
    if (!this.isGameOver) return;

    push();
    // Semi-transparent overlay
    fill(0, 220);
    rect(0, 0, width, height);

    fill(255);
    textFont(Cookie_font);
    textSize(56);
    textAlign(CENTER);

    if (this.hasWon) {
      fill(100, 255, 100);
      text('MISSION COMPLETE!', width / 2, height / 2 - 100);
      fill(255);
      textSize(32);
      text('Neptune is happy and warm! ☕', width / 2, height / 2 - 40);
    } else {
      fill(255, 100, 100);
      text('GAME OVER', width / 2, height / 2 - 100);
      fill(255);
      textSize(32);
      text('You ran out of health!', width / 2, height / 2 - 40);
    }

    textFont(Cookie_thin_font);
    textSize(28);
    text(`Final Score: ${this.score}`, width / 2, height / 2 + 20);
    text(`Time: ${this.getPlayTimeFormatted()}`, width / 2, height / 2 + 60);
    text(`Asteroids Destroyed: ${this.asteroidsDestroyed}`, width / 2, height / 2 + 100);

    textSize(24);
    text('Press R to restart', width / 2, height / 2 + 160);

    pop();
  }
}
