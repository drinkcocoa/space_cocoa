# Space Cocoa ☕🚀

> A heartwarming space adventure game where you journey across the solar system to make hot cocoa for a cold Neptune!

## 🎮 Game Story

Neptune is shivering in the cold, far from the Sun's warmth. As a friendly star, you embark on an epic quest to gather ingredients from different planets and create the perfect hot cocoa to warm Neptune's heart!

### Your Mission:
1. Visit Uranus to collect fresh milk
2. Visit Saturn to gather cocoa powder
3. Visit Earth to get whipped cream
4. Travel to the Sun to heat everything up
5. Navigate through asteroid fields between planets
6. Return to Neptune with the completed hot cocoa!

## 🕹️ How to Play

### Desktop Controls:
- **Arrow Keys**: Move your ship
  - ⬆️ UP: Boost forward
  - ⬅️ LEFT: Turn left
  - ➡️ RIGHT: Turn right
- **SPACE**: Fire lasers to destroy asteroids
- **P**: Pause/Resume game
- **R**: Restart game
- **Mouse Click**: Progress through dialog

### Mobile/Touch Controls:
- **◄ LEFT Button**: Turn left
- **► RIGHT Button**: Turn right
- **▲ FORWARD Button**: Boost forward
- **● FIRE Button**: Shoot lasers / Progress dialog

## 🎯 Gameplay Features

### Core Mechanics:
- **Space Navigation**: Pilot your ship through the solar system
- **Asteroid Combat**: Destroy asteroids for points and safety
- **Health System**: Avoid asteroids or lose health
- **Dialog System**: Interact with planets to gather ingredients
- **Scene Progression**: Fly off the right edge of the screen to advance

### Game Systems:
- **Scoring**: Earn 100 points for each asteroid destroyed
- **Health Bar**: Start with 100 health, lose 10 per asteroid hit
- **Ingredient Tracker**: See which ingredients you've collected
- **Timer**: Track how long your journey takes
- **Particle Effects**: Explosions, trails, and visual feedback
- **Pause Menu**: Pause anytime to take a break

### Planets & Ingredients:
1. **Neptune** (🔵): The cold planet who needs help
2. **Uranus** (🌀): Provides fresh milk
3. **Saturn** (🪐): Offers cocoa powder
4. **Earth** (🌍): Gives whipped cream cloud
5. **Sun** (☀️): Heats up your cocoa

## 🚀 Quick Start

### Playing the Game:
1. Open `index.html` in a modern web browser
2. The game will load automatically
3. Use arrow keys to move from the title screen
4. Fly right to begin your adventure!

### System Requirements:
- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- Works on desktop and mobile devices

## 📁 Project Structure

```
space_cocoa/
├── index.html              # Main HTML file
├── sketch.js               # Main game logic
├── style.css               # Styles and mobile controls
├── README.md               # This file
├── LICENSE                 # MIT License
├── js/                     # JavaScript modules
│   ├── config.js           # Game configuration
│   ├── sceneManager.js     # Scene state management
│   ├── dialogSystem.js     # Dialog/conversation system
│   ├── gameState.js        # Game state & UI
│   ├── particles.js        # Particle effects system
│   ├── soundManager.js     # Audio management
│   ├── ship.js             # Player ship class
│   ├── asteroid.js         # Asteroid class
│   ├── laser.js            # Laser projectile class
│   └── p5.*.js             # p5.js library files
└── assets/                 # Game assets
    ├── images/             # PNG images
    │   ├── Neptune.png
    │   ├── Uranus.png
    │   ├── Saturn.png
    │   ├── Earth.png
    │   ├── Sun.png
    │   ├── Sunlight.png
    │   ├── Star.png
    │   ├── starcocoa.png
    │   ├── hurtstar.png
    │   └── onlycocoa.png
    ├── fonts/              # Custom fonts
    │   ├── CookieRun.ttf
    │   └── CookieRun_bold.ttf
    └── sounds/             # Sound effects (future)
```

## 🛠️ Technical Details

### Built With:
- **p5.js** - Creative coding library for rendering and game loop
- **p5.sound.js** - Audio library (ready for sound effects)
- **Vanilla JavaScript** - Modular ES5/ES6 architecture
- **HTML5 Canvas** - Graphics rendering
- **CSS3** - Responsive styling and touch controls

### Architecture:
The game uses a modular architecture with separate systems for:
- **Scene Management**: Controls game flow between scenes
- **Dialog System**: Reusable conversation framework
- **Game State**: Tracks score, health, ingredients, time
- **Particle System**: Visual effects for explosions and trails
- **Sound Manager**: Centralized audio control (ready for expansion)

### Code Highlights:
- Reduced from ~750 lines to ~560 lines through refactoring
- Separation of concerns with dedicated modules
- Configuration-driven dialog and scene data
- Mobile-first responsive design
- Touch event handling for mobile devices

## ⚙️ Configuration

Edit `js/config.js` to customize game settings:

```javascript
CONFIG.game = {
  asteroidCount: 15,        // Number of asteroids in asteroid field
  stunDuration: 2000,       // Milliseconds ship is stunned after hit
  shipSize: 20,             // Player ship radius
  laserSpeed: 10,           // Laser projectile speed
  shipRotationSpeed: 0.1,   // Ship turning speed
  shipBoostForce: 0.1,      // Forward thrust strength
  // ... and more!
};
```

## 🎨 Customization

### Adding New Planets:
1. Add dialog in `js/config.js` under `CONFIG.dialogs`
2. Add scene ID in `CONFIG.scenes`
3. Add case in `sketch.js` switch statement
4. Create scene render function

### Adding Sound Effects:
1. Place audio files in `assets/sounds/`
2. Uncomment sound loading in `js/soundManager.js`
3. Add loading calls in `loadSounds()` method
4. Sounds will automatically play at appropriate times

## 🐛 Debugging

The game includes several debug-friendly features:
- Configurable game constants for easy tweaking
- Modular architecture for isolated testing
- Console-free code (removed all debug prints)
- Comprehensive error checking

## 📝 Development Notes

### Recent Improvements:
- ✅ Fixed critical bugs (missing braces, timer logic)
- ✅ Removed all debug statements
- ✅ Reorganized project structure
- ✅ Created modular architecture with 6 new systems
- ✅ Added pause menu and restart functionality
- ✅ Implemented scoring and health systems
- ✅ Added visual particle effects
- ✅ Added mobile touch controls
- ✅ Standardized variable naming
- ✅ Completed all planet return scenes
- ✅ Added comprehensive UI (health bar, ingredient tracker, timer)

### Future Enhancements:
- Add background music and sound effects
- Create additional levels or challenges
- Add power-ups and special abilities
- Implement difficulty levels
- Add local high score persistence
- Create achievements system

## 🤝 Contributing

This is a creative project! Feel free to:
- Add new planets and dialogs
- Create new asteroid patterns
- Design new visual effects
- Add sound effects and music
- Improve mobile UX
- Fix bugs or optimize code

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits

- **Game Design & Development**: Space Cocoa Team
- **Font**: CookieRun (included in assets)
- **Framework**: p5.js library
- **Inspiration**: Classic arcade space games + wholesome vibes

## 🌟 Tips & Tricks

1. **Asteroid Navigation**: Smaller asteroids are faster but worth the same points
2. **Health Management**: Each hit costs 10 health - be careful!
3. **Ingredient Collection**: Talk to all planets to complete your journey
4. **Score Maximization**: Destroy as many asteroids as possible for high scores
5. **Time Attack**: Try to complete the game as quickly as possible
6. **Exploration**: Talk to planets on your return journey for bonus dialog!

## 📞 Support

Having issues? Check these common solutions:
- **Game won't load**: Ensure JavaScript is enabled
- **Images not showing**: Check file paths match directory structure
- **Touch controls not working**: Try refreshing on mobile device
- **Performance issues**: Close other browser tabs

---

**Enjoy your journey across the cosmos! ☕🌟**

*Made with love for Neptune and hot cocoa enthusiasts everywhere.*
