// Dialog System for managing conversations with planets
class DialogSystem {
  constructor() {
    this.active = false;
    this.currentStep = 0;
    this.currentDialog = null;
    this.skipLock = false;
  }

  start(dialogKey) {
    this.active = true;
    this.currentStep = 0;
    this.currentDialog = CONFIG.dialogs[dialogKey];
  }

  next() {
    if (!this.skipLock) {
      this.currentStep++;
    }
  }

  isActive() {
    return this.active;
  }

  getCurrentStep() {
    return this.currentStep;
  }

  isComplete() {
    return this.currentDialog && this.currentStep >= this.currentDialog.length;
  }

  end() {
    this.active = false;
    this.currentStep = 0;
    this.currentDialog = null;
  }

  getCurrentText() {
    if (!this.currentDialog || this.currentStep >= this.currentDialog.length) {
      return null;
    }
    return this.currentDialog[this.currentStep];
  }

  render(shipPos, planetPos, planetTremble = { x: 0, y: 0 }) {
    if (!this.active || !this.currentDialog) return;

    const dialogData = this.getCurrentText();
    if (!dialogData) {
      return;
    }

    push();
    fill(255);
    textSize(20);

    // Show progress hint on first step
    if (this.currentStep === 0) {
      text(CONFIG.ui.progressHint, width / 2, 50);
    }

    // Show item notification if present
    if (dialogData.item) {
      push();
      fill(255, 220, 100);
      textSize(24);
      text(`Got ${dialogData.item}!`, width / 2, 80);
      pop();
    }

    // Render dialog based on speaker
    let textX, textY;
    switch (dialogData.speaker) {
      case 'ship':
        textX = shipPos.x;
        textY = shipPos.y - 50;
        break;
      case 'system':
        push();
        fill(255);
        textSize(24);
        text(dialogData.text, width / 2, 100);
        pop();
        return;
      default:
        // Planet dialog (neptune, uranus, saturn, earth, sun)
        textX = planetPos.x + planetTremble.x - 40;
        textY = planetPos.y - 50 + planetTremble.y - 100;
        break;
    }

    text(dialogData.text, textX, textY);
    pop();

    // Ellipse indicator
    if (this.currentStep === 0) {
      push();
      fill(255);
      ellipse(50, 50, 50, 50);
      pop();
    }
  }

  renderTriggerBox(triggerX, triggerY, triggerW, triggerH) {
    push();
    noFill();
    stroke(255, 80);
    rect(triggerX, triggerY, triggerW, triggerH);
    textSize(16);
    fill(255, 80);
    noStroke();
    textFont(cookieThinFont);
    text(CONFIG.ui.dialogHint, triggerX + triggerW / 2, triggerY + triggerH + 20);
    pop();
  }
}
