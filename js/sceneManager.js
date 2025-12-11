// Scene Manager for handling game scene transitions and state
class SceneManager {
  constructor() {
    this.currentScene = CONFIG.scenes.TITLE;
    this.sceneHistory = [];
    this.nextSceneRequested = false;
    this.readyToGo = false;
  }

  getCurrentScene() {
    return this.currentScene;
  }

  isReadyToGo() {
    return this.readyToGo;
  }

  setReadyToGo(ready) {
    this.readyToGo = ready;
  }

  requestNextScene() {
    this.nextSceneRequested = true;
  }

  isNextSceneRequested() {
    return this.nextSceneRequested;
  }

  goToScene(sceneId) {
    this.currentScene = sceneId;
    this.nextSceneRequested = false;
    this.readyToGo = false;
  }

  goToNextScene() {
    if (max(this.sceneHistory) > -1) {
      this.currentScene = max(this.sceneHistory) + 1;
    } else {
      this.currentScene++;
    }
    this.nextSceneRequested = false;
    this.readyToGo = false;
  }

  goToAsteroidScene() {
    this.currentScene = CONFIG.scenes.ASTEROID;
    this.nextSceneRequested = false;
    this.readyToGo = false;
  }

  addToHistory(sceneId) {
    this.sceneHistory.push(sceneId);
  }

  reset() {
    this.nextSceneRequested = false;
  }
}
