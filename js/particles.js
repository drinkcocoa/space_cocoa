// Particle System for visual effects
class Particle {
  constructor(x, y, color = null) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(1, 4));
    this.lifespan = 255;
    this.color = color || color(255, random(100, 255), random(0, 100));
    this.size = random(2, 6);
  }

  update() {
    this.pos.add(this.vel);
    this.vel.mult(0.95);
    this.lifespan -= 5;
  }

  render() {
    push();
    noStroke();
    fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.lifespan);
    ellipse(this.pos.x, this.pos.y, this.size);
    pop();
  }

  isDead() {
    return this.lifespan <= 0;
  }
}

class ParticleSystem {
  constructor() {
    this.particles = [];
  }

  addExplosion(x, y, count = 20, particleColor = null) {
    for (let i = 0; i < count; i++) {
      this.particles.push(new Particle(x, y, particleColor));
    }
  }

  addTrail(x, y, particleColor = null) {
    this.particles.push(new Particle(x, y, particleColor));
  }

  update() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update();
      if (this.particles[i].isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }

  render() {
    for (let particle of this.particles) {
      particle.render();
    }
  }

  clear() {
    this.particles = [];
  }
}
