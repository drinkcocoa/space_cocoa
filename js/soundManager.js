// Sound Manager for game audio
class SoundManager {
  constructor() {
    this.sounds = {};
    this.music = null;
    this.musicVolume = 0.5;
    this.sfxVolume = 0.7;
    this.enabled = true;
  }

  // Load sounds in preload
  loadSounds() {
    // Placeholder for future sound loading
    // Example:
    // this.sounds.laser = loadSound('assets/sounds/laser.mp3');
    // this.sounds.explosion = loadSound('assets/sounds/explosion.mp3');
    // this.sounds.hit = loadSound('assets/sounds/hit.mp3');
    // this.music = loadSound('assets/sounds/music.mp3');
  }

  playLaser() {
    if (this.enabled && this.sounds.laser) {
      this.sounds.laser.setVolume(this.sfxVolume);
      this.sounds.laser.play();
    }
  }

  playExplosion() {
    if (this.enabled && this.sounds.explosion) {
      this.sounds.explosion.setVolume(this.sfxVolume);
      this.sounds.explosion.play();
    }
  }

  playHit() {
    if (this.enabled && this.sounds.hit) {
      this.sounds.hit.setVolume(this.sfxVolume * 0.5);
      this.sounds.hit.play();
    }
  }

  playCollect() {
    if (this.enabled && this.sounds.collect) {
      this.sounds.collect.setVolume(this.sfxVolume);
      this.sounds.collect.play();
    }
  }

  playMusic() {
    if (this.enabled && this.music && !this.music.isPlaying()) {
      this.music.setVolume(this.musicVolume);
      this.music.loop();
    }
  }

  stopMusic() {
    if (this.music && this.music.isPlaying()) {
      this.music.stop();
    }
  }

  pauseMusic() {
    if (this.music && this.music.isPlaying()) {
      this.music.pause();
    }
  }

  resumeMusic() {
    if (this.music && !this.music.isPlaying()) {
      this.music.play();
    }
  }

  setMusicVolume(vol) {
    this.musicVolume = constrain(vol, 0, 1);
    if (this.music) {
      this.music.setVolume(this.musicVolume);
    }
  }

  setSfxVolume(vol) {
    this.sfxVolume = constrain(vol, 0, 1);
  }

  toggleSound() {
    this.enabled = !this.enabled;
    if (!this.enabled) {
      this.stopMusic();
    } else {
      this.playMusic();
    }
  }
}
