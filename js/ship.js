function Ship() {
  this.pos = createVector(width / 2, height / 2);
  this.r = CONFIG.game.shipSize;
  this.heading = 0;
  this.rotation = 0;
  this.vel = createVector(0, 0);
  this.isBoosting = false;

  this.boosting = function(b) {
    this.isBoosting = b;
  }

  this.update = function() {
    if (this.isBoosting) {
      this.boost();
    }
    this.pos.add(this.vel);
    this.vel.mult(CONFIG.game.velocityDamping);
    if (typeof dialogSystem !== 'undefined' && dialogSystem.isActive()) {
      this.vel.mult(0);
    }
    if (stun == true) {
      this.vel.mult(CONFIG.game.stunVelocityDamping);
    }
  }

  this.boost = function() {
    var force = p5.Vector.fromAngle(this.heading);
    force.mult(CONFIG.game.shipBoostForce);
    if (typeof dialogSystem !== 'undefined' && dialogSystem.isActive()) {
      force.mult(0);
    }

    this.vel.add(force);
  }

  this.hits = function(asteroid) {
    var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < this.r + asteroid.r) {
      return true;
    } else {
      return false;
    }
  }

  this.render = function() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI/2);
    fill(111, 210, 231, 100);
    fill(0);
    stroke(255);
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);

    const isHoldingCocoa = typeof gameState !== 'undefined' && gameState.isHoldingCocoa();

    if (!isHoldingCocoa) {
      if (stun == true) {
        image(images.hurtstar, -33, -35);
      }
      else {
        image(images.Star, -33, -35);
      }
    }
    else {
      image(images.starcocoa, -72, -85);
    }
    pop();
  }

  this.edges = function() {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
      if (typeof sceneManager !== 'undefined' && sceneManager.isReadyToGo()) {
        sceneManager.addToHistory(sceneManager.getCurrentScene());
        sceneManager.requestNextScene();
      }

    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  }

  this.setRotation = function(a) {
    this.rotation = a;
  }

  this.turn = function() {
    this.heading += this.rotation;
  }

}
