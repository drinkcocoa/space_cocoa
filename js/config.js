// Game Configuration
const CONFIG = {
  // Game settings
  game: {
    asteroidCount: 15,
    stunDuration: 250,
    fadeAlpha: 65,
    shipSize: 20,
    laserSpeed: 10,
    shipRotationSpeed: 0.1,
    shipBoostForce: 0.1,
    velocityDamping: 0.99,
    stunVelocityDamping: 0.94,
    hitDamage: 10,
    hitCooldownDuration: 600,
    hitFlashDuration: 160,
    hitFlashAlpha: 110,
    hitShakeDuration: 200,
    hitShakeIntensity: 7,
    hitKnockbackForce: 2.8
  },

  // Scene IDs
  scenes: {
    TITLE: -1,
    NEPTUNE: 0,
    ASTEROID: 1,
    URANUS: 2,
    SATURN: 3,
    EARTH: 4,
    SUN: 5,
    EARTH_RETURN: 6,
    SATURN_RETURN: 7,
    URANUS_RETURN: 8,
    NEPTUNE_RETURN: 9,
    ENDING: 10
  },

  // Dialog text for each scene
  dialogs: {
    neptune: [
      { speaker: 'ship', text: 'Oh, Neptune! Are you OK?' },
      { speaker: 'neptune', text: 'No.. I\'m too cold..' },
      { speaker: 'neptune', text: 'Sun is too far from me..' },
      { speaker: 'ship', text: 'You need something hot..' },
      { speaker: 'ship', text: 'Ah, I will make hot cocoa for you!' },
      { speaker: 'neptune', text: 'Really? Thank you...' },
      { speaker: 'neptune', text: 'But, watch out the asteroids..!' }
    ],
    uranus: [
      { speaker: 'ship', text: 'Hello Uranus!' },
      { speaker: 'uranus', text: 'Hi!' },
      { speaker: 'ship', text: 'Uranus, Can you give me some milk?' },
      { speaker: 'uranus', text: 'Of course! I\'m made of milk.' },
      { speaker: 'uranus', text: 'But, why do you need that?' },
      { speaker: 'ship', text: 'Neptune is shivering with cold!' },
      { speaker: 'ship', text: 'I\'m gonna make hot cocoa for him.' },
      { speaker: 'uranus', text: 'Oh, Here you are.', item: 'fresh milk' },
      { speaker: 'ship', text: 'Thank you!!' }
    ],
    saturn: [
      { speaker: 'ship', text: 'Hello, Mr.Saturn!' },
      { speaker: 'saturn', text: 'Long time no see!' },
      { speaker: 'ship', text: 'Mr.Saturn, Could you give me some cocoa, please?' },
      { speaker: 'saturn', text: 'Of course! I\'m made of cocoa powder.' },
      { speaker: 'saturn', text: 'But, why do you need that?' },
      { speaker: 'ship', text: 'Neptune is shivering with cold!' },
      { speaker: 'ship', text: 'I\'m gonna make hot cocoa for him.' },
      { speaker: 'saturn', text: 'That\'s a good boy!, Here you are.', item: 'cocoa powder' },
      { speaker: 'ship', text: 'Thank you!!' }
    ],
    earth: [
      { speaker: 'ship', text: 'Hello, Mr.Earth!' },
      { speaker: 'earth', text: 'Hi, star!' },
      { speaker: 'ship', text: 'Mr.Earth, Could you give me some whipped cream, please?' },
      { speaker: 'earth', text: 'Of course! I have lots of whipped cream cloud.' },
      { speaker: 'earth', text: 'But, why do you need that?' },
      { speaker: 'ship', text: 'Neptune is shivering with cold!' },
      { speaker: 'ship', text: 'I\'m gonna make hot cocoa for him.' },
      { speaker: 'earth', text: 'OK, Here you are!', item: 'whipped cream cloud' },
      { speaker: 'ship', text: 'Thank you!!' }
    ],
    sun: [
      { speaker: 'ship', text: 'Hello, Mr.Sun!' },
      { speaker: 'sun', text: '...Hello' },
      { speaker: 'ship', text: 'Could I heat up the hot cocoa here?' },
      { speaker: 'sun', text: '...Sure, you can.' },
      { speaker: 'system', text: 'Put all the ingredients..' },
      { speaker: 'system', text: 'The hottest hot cocoa is done!' },
      { speaker: 'ship', text: 'Thank you Mr.Sun!' },
      { speaker: 'sun', text: '...You\'re welcome.' }
    ],
    earthReturn: [
      { speaker: 'earth', text: 'Wow, hot cocoa is bigger than me!' }
    ],
    saturnReturn: [
      { speaker: 'saturn', text: 'What a good boy!' }
    ],
    uranusReturn: [
      { speaker: 'uranus', text: 'That looks delicious!' }
    ],
    neptuneReturn: [
      { speaker: 'ship', text: 'Neptune! I brought hot cocoa for you!' },
      { speaker: 'neptune', text: 'Oh! Thank you so much!' },
      { speaker: 'neptune', text: '*sips* Mmm... This is so warm and delicious!' },
      { speaker: 'neptune', text: 'I feel much better now!' },
      { speaker: 'ship', text: 'I\'m so glad! Stay warm, Neptune!' },
      { speaker: 'system', text: 'Mission Complete! Neptune is happy and warm!' }
    ]
  },

  // Planet positions and trigger zones
  planetPositions: {
    neptune: {
      x: 'width - 300',
      y: 'height/2 - 100',
      triggerX: 'width - 600',
      triggerY: 'height/2 - 100',
      triggerW: 200,
      triggerH: 200,
      trembles: true
    },
    uranus: {
      x: 'width - 300',
      y: 'height/2 - 100',
      triggerX: 'width - 600',
      triggerY: 'height/2 - 100',
      triggerW: 200,
      triggerH: 200,
      trembles: false
    },
    saturn: {
      x: 'width - 800',
      y: 'height/2 - 400',
      triggerX: 'width - 1000',
      triggerY: 'height/2 - 200',
      triggerW: 200,
      triggerH: 200,
      trembles: false
    },
    earth: {
      x: 'width - 300',
      y: 'height/2 - 100',
      triggerX: 'width - 600',
      triggerY: 'height/2 - 100',
      triggerW: 200,
      triggerH: 200,
      trembles: false
    },
    sun: {
      x: 'width/2',
      y: '100',
      triggerX: 'width/2 + 420',
      triggerY: 'height/2',
      triggerW: 200,
      triggerH: 200,
      trembles: false
    }
  },

  // UI text
  ui: {
    title: 'Space Cocoa~',
    controls: 'Press Arrow key to move!',
    progressHint: 'Press SPACE to progress',
    goPrompt: 'GO -->',
    dialogHint: 'say hello in here!',
    fireHint: 'Press SPACE to continue dialog',
    pauseHint: 'Press P to pause'
  }
};
