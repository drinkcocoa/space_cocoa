var ship;
var asteroids = [];
var lasers = [];

//Scene manager values
var nextScene = false
var currentScene = -1;
var Scene_nums = []
let sun_end = false;
var skiplock = false;
var alpha = 0;
let holdcocoa = false;

var dialog = false;
var dia_next = 0;
var letsgo = false;
let myTime =0

//assets
let Cookie_font;
let Cookie_thin_font;

let img_Neptune;
let img_Uranus;
let img_Saturn;
let img_Earth;
let img_Star;
let img_Sun;
let img_Sunlight;
let img_starcocoa;
let img_onlycocoa;
let img_hurtstar;

function preload() {
  imageload();
  fontload();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
    textSize(32);
    textFont(Cookie_font);
    textAlign(CENTER);
  imageload();
  ship = new Ship();
  for (var i = 0; i < 15; i++) {
    asteroids.push(new Asteroid());
  }

}

function draw() {
  background(0, 65);

  if (letsgo == true && currentScene != -1) {
    fill(255)
    text('GO -->', width/2, 50);
    }
  //Title scene
    if (currentScene == -1) {
      letsgo = true;
      textFont(Cookie_font);
      push();
      fill(255)
    text('Space Cocoa~', windowWidth/2, 100);
      text('Press Arrow key to move!', width/2, height-200);
      pop();
            
  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
  if (nextScene == true) {
    currentScene++;
    reset();
  }
  
    
  }
  //Neptune scene
  if (currentScene == 0) {
    let tremble_x = random(-1, 1);
    let tremble_y = random(-1, 1);
    image(img_Neptune, width - 300 + tremble_x, height/2-100 + tremble_y)
    
    //dialog trigger box
    if (letsgo == false && dialog == false) {
     push();
      noFill();
      stroke(255, 80);
      rect(width-600, height/2-100, 200, 200);
      textSize(16);
      fill(255, 80);
      noStroke();
      textFont(Cookie_thin_font);
      text('say hello in here!', width-500, height/2 + 120)
      pop();
    }
    //dialog trigger
  if (ship.pos.x > width - 600 && ship.pos.x < width - 400 && ship.pos.y > height/2 - 100 && ship.pos.y < height/2 + 100) {
    dialog = true;
    push();
    fill(255);
    ellipse(50, 50, 50, 50);
    textSize(20);
    
    //dialog text
    switch(dia_next) {
      case 0:
        text('Oh, Neptune! Are you OK?', ship.pos.x, ship.pos.y - 50);
        text('Mouse click to progress', width/2, 50);
        break;
      case 1:
        text('No.. I\'m too cold..', width - 300 + tremble_x - 40, height/2-50 + tremble_y - 100);
        break;
      case 2:
        text('Sun is too far from me..', width - 300 + tremble_x - 40, height/2-50 + tremble_y - 100);
        break;
      case 3:
        text('You need something hot..', ship.pos.x, ship.pos.y - 50);
        break;
        case 4:
        text('Ah, I will make hot cocoa for you!', ship.pos.x, ship.pos.y - 50);
        break;
        case 5:
        text('Really? Thank you...', width - 300 + tremble_x - 40, height/2-50 + tremble_y - 100);
        break;
        case 6:
        text('But, watch out the asteroids..!', width - 300 + tremble_x - 40, height/2-50 + tremble_y - 100);
        break;
        case 7:
        letsgo = true;
        dialog = false;
        break;
        
    }
    
    pop();

  }
    

    //sceneswitcher
  if (nextScene == true) {
    currentScene++;
    reset();
  }
      ship.render();
  ship.turn();
  ship.update();
  ship.edges();
    
    
  }
  //asteroid scene
  if (currentScene == 1) {
    letsgo = true;

  for (var i = 0; i < asteroids.length; i++) {
    if (ship.hits(asteroids[i])) {
      stun = true;
      stunned();
      
    }
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }

  for (var i = lasers.length - 1; i >= 0; i--) {
    lasers[i].render();
    lasers[i].update();
    if (lasers[i].offscreen()) {
      lasers.splice(i, 1);
    } else {
      for (var j = asteroids.length - 1; j >= 0; j--) {
        if (lasers[i].hits(asteroids[j])) {
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

  ship.render();
  ship.turn();
  ship.update();
  ship.edges();


  if (nextScene == true) {
    if (max(Scene_nums) > -1) {
      //go to next Scene
      saveScene();
    }
    else {
    currentScene++;
    }
    reset();
    }
  }
  //Uranus scene
  if(currentScene == 2) {
    image(img_Uranus, width - 300, height/2-100);
    
    //dialog trigger box
    if (letsgo == false && dialog == false) {
     push();
      noFill();
      stroke(255, 80);
      rect(width-600, height/2-100, 200, 200);
      textSize(16);
      fill(255, 80);
      noStroke();
      textFont(Cookie_thin_font);
      text('say hello in here!', width-500, height/2 + 120);
      pop();
    }
    
        //dialog trigger
  if (ship.pos.x > width - 600 && ship.pos.x < width - 400 && ship.pos.y > height/2 - 100 && ship.pos.y < height/2 + 100) {
    dialog = true;
    push();
    fill(255);
    ellipse(50, 50, 50, 50);
    textSize(20);
    
    //dialog text
    switch(dia_next) {
      case 0:
        text('Hello Uranus!', ship.pos.x, ship.pos.y - 50);
        text('Mouse click to progress', width/2, 50);
        break;
      case 1:
        text('Hi!', width - 300- 40, height/2-50 - 100);
        break;
      case 2:
        text('Uranus, Can you give me some milk?', ship.pos.x, ship.pos.y - 50);
        break;
      case 3:
        text('Of course! I\'m made of milk.', width - 300- 40, height/2-50 - 100);
        break;
        case 4:
        text('But, why do you need that?', width - 300- 40, height/2-50 - 100);
        break;
        case 5:
        text('Neptune is shivering with cold!', ship.pos.x, ship.pos.y - 50);
        break;
        case 6:
        text('I\'m gonna make hot cocoa for him.', ship.pos.x, ship.pos.y - 50);
        break;
        case 7:
        text('Oh, Here you are.', width - 300 - 40, height/2-50 - 100);
        text('got fresh milk!', width/2, 80);
        break;
        case 8:
        text('Thank you!!', ship.pos.x, ship.pos.y - 50);
        break;
        case 9:
        letsgo = true;
        dialog = false;
        break;
        
    }
    
    pop();

  }
        
  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
  if (nextScene == true) {
    print('wow!');
    //go asteroid scene
    currentScene = 1;
    reset();
    }
  }
  
  
  //Saturn Scene
  if (currentScene == 3) {
    image(img_Saturn, width - 800, height/2-400);
    
    //dialog trigger box
    if (letsgo == false && dialog == false) {
     push();
      noFill();
      stroke(255, 80);
      rect(width-1000, height/2-200, 200, 200);
      textSize(16);
      fill(255, 80);
      noStroke();
      textFont(Cookie_thin_font);
      text('say hello in here!', width-900, height/2 + 20);
      pop();
    }
    
        //dialog trigger
  if (ship.pos.x > width - 1000 && ship.pos.x < width - 800 && ship.pos.y > height/2 - 200 && ship.pos.y < height/2) {
    dialog = true;
    push();
    fill(255);
    ellipse(50, 50, 50, 50);
    textSize(20);
    
    //dialog text
    switch(dia_next) {
      case 0:
        text('Hello, Mr.Saturn!', ship.pos.x, ship.pos.y - 50);
        text('Mouse click to progress', width/2, 50);
        break;
      case 1:
        text('Long time no see!', width - 500- 40, height/2-50 - 100);
        break;
      case 2:
        text('Mr.Saturn, Could you give me some cocoa, please?', ship.pos.x, ship.pos.y - 50);
        break;
      case 3:
        text('Of course! I\'m made of cocoa powder.', width - 500- 40, height/2-50 - 100);
        break;
        case 4:
        text('But, why do you need that?', width - 500- 40, height/2-50 - 100);
        break;
        case 5:
        text('Neptune is shivering with cold!', ship.pos.x, ship.pos.y - 50);
        break;
        case 6:
        text('I\'m gonna make hot cocoa for him.', ship.pos.x, ship.pos.y - 50);
        break;
        case 7:
        text('That\'s a good boy!, Here you are.', width - 500 - 40, height/2-50 - 100);
        text('got cocoa powder!', width/2, 80);
        break;
        case 8:
        text('Thank you!!', ship.pos.x, ship.pos.y - 50);
        break;
        case 9:
        letsgo = true;
        dialog = false;
        break;
        
    }
    
    pop();

  }
        
  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
  if (nextScene == true) {
    print('wow!');
    //go asteroid scene
    currentScene = 1;
    reset();
    }
  }
  
  //Earth Scene
  if (currentScene == 4) {
    image(img_Earth, width - 300, height/2-100);
    
    //dialog trigger box
    if (letsgo == false && dialog == false) {
     push();
      noFill();
      stroke(255, 80);
      rect(width-600, height/2-100, 200, 200);
      textSize(16);
      fill(255, 80);
      noStroke();
      textFont(Cookie_thin_font);
      text('say hello in here!', width-500, height/2 + 120);
      pop();
    }
    
        //dialog trigger
  if (ship.pos.x > width - 600 && ship.pos.x < width - 400 && ship.pos.y > height/2 - 100 && ship.pos.y < height/2 + 100) {
    dialog = true;
    push();
    fill(255);
    ellipse(50, 50, 50, 50);
    textSize(20);
    
    //dialog text
    switch(dia_next) {
      case 0:
        text('Hello, Mr.Earth!', ship.pos.x, ship.pos.y - 50);
        text('Mouse click to progress', width/2, 50);
        break;
      case 1:
        text('Hi, star!', width - 500- 40, height/2-50 - 100);
        break;
      case 2:
        text('Mr.Earth, Could you give me some whipped cream, please?', ship.pos.x, ship.pos.y - 50);
        break;
      case 3:
        text('Of course! I have lots of whipped cream cloud.', width - 500- 40, height/2-50 - 100);
        break;
        case 4:
        text('But, why do you need that?', width - 500- 40, height/2-50 - 100);
        break;
        case 5:
        text('Neptune is shivering with cold!', ship.pos.x, ship.pos.y - 50);
        break;
        case 6:
        text('I\'m gonna make hot cocoa for him.', ship.pos.x, ship.pos.y - 50);
        break;
        case 7:
        text('OK, Here you are!', width - 500 - 40, height/2-50 - 100);
        text('got whipped cream cloud!', width/2, 80);
        break;
        case 8:
        text('Thank you!!', ship.pos.x, ship.pos.y - 50);
        break;
        case 9:
        letsgo = true;
        dialog = false;
        break;
        
    }
    
    pop();

  }
        
  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
  if (nextScene == true) {
    print('wow!');
    //go asteroid scene
    currentScene = 1;
    reset();
    }
  }
  
    //Sun Scene
  if (currentScene == 5) {
    image(img_Sun, width/2, 100);
    sun_end = true;
    //dialog trigger box
    if (letsgo == false && dialog == false) {
     push();
      noFill();
      stroke(0, 80);
      rect(width/2 + 420, height/2, 200, 200);
      fill(255, 80);
      noStroke();
      pop();
    }
    
        //dialog trigger
  if (ship.pos.x > width/2 +420 && ship.pos.x < width/2 + 620 && ship.pos.y > height/2 && ship.pos.y < height/2 + 200) {
    dialog = true;
    push();
    fill(255);
    ellipse(50, 50, 50, 50);
    textSize(20);
    pop();
        push();
        fill(0);
        textSize(24);
        pop();
    
    //dialog text
    switch(dia_next) {
      case 0:
        text('Hello, Mr.Sun!', ship.pos.x, ship.pos.y - 50);
        text('Mouse click to progress', width/2, 50);
        break;
      case 1:
        text('...Hello', width - 500- 40, height/2-50 - 100);
        break;
      case 2:
        text('Could I heat up the hot cocoa here?', ship.pos.x, ship.pos.y - 50);
        break;
      case 3:
        text('...Sure, you can.', width - 500- 40, height/2-50 - 100);
        break;
        case 4:
        push();
        fill(255);
        text('Put all the ingredients..', width/2, 100);
        pop();
        break;
        case 5:
        push();
        fill(255);
        text('The hottest hot cocoa is done!', width/2, 100);
        image(img_onlycocoa, ship.pos.x-40, ship.pos.y-50);
        pop();
        break;
        case 6:
        text('Thank you Mr.Sun!', ship.pos.x, ship.pos.y - 150);
        holdcocoa = true;
        break;
        case 7:
        text('...You\'re welcome.', width - 500 - 40, height/2-50 - 100);
        break;
        case 8:
        letsgo = true;
        dialog = false;
        break;
        
    }
    

  }
        
  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
  image(img_Sunlight, width/2, 100);
  if (nextScene == true) {
    print('wow!');
    //go asteroid scene
    currentScene = 1;
    reset();
    }
  }
  
  //second Earth scene
    if (currentScene == 6) {
      letsgo = true;
      text('second Earth', width/2, height/2);
    image(img_Earth, width - 300, height/2-100);
    
    
        //dialog trigger
  if (ship.pos.x > width/2) {
    text('Wow, hot cocoa is bigger than me!', width - 500- 40, height/2-50 - 100);

  }
        
  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
  if (nextScene == true) {
    print('wow!');
    //go asteroid scene
    currentScene = 1;
    reset();
    }
  }
  
    //second Saturn scene
    if (currentScene == 7) {
      letsgo = true;
    image(img_Saturn, width - 800, height/2-400);


        //dialog trigger
  if (ship.pos.x > width/2) {
    text('What a good boy!', width - 500- 40, height/2-50 - 100);
  }

  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
  if (nextScene == true) {
    //go asteroid scene
    currentScene = 1;
    reset();
    }
  }

    //second Uranus scene
    if(currentScene == 8) {
      letsgo = true;
    image(img_Uranus, width - 300, height/2-100);


        //dialog trigger
  if (ship.pos.x > width/2) {
    text('That looks delicious!', width - 300- 40, height/2-50 - 100);
  }

  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
  if (nextScene == true) {
    //go asteroid scene
    currentScene = 1;
    reset();
    }
  }
  
    //second Neptune scene
    if (currentScene == 9) {
    let tremble_x = random(-1, 1);
    let tremble_y = random(-1, 1);
    image(img_Neptune, width - 300 + tremble_x, height/2-100 + tremble_y)
    
    //dialog trigger box
    if (letsgo == false && dialog == false) {
     push();
      noFill();
      stroke(255, 80);
      rect(width-600, height/2-100, 200, 200);
      textSize(16);
      fill(255, 80);
      noStroke();
      textFont(Cookie_thin_font);
      text('say hello in here!', width-500, height/2 + 120);
      pop();
    }
    //dialog trigger
  if (ship.pos.x > width - 600 && ship.pos.x < width - 400 && ship.pos.y > height/2 - 100 && ship.pos.y < height/2 + 100) {
    dialog = true;
    push();
    fill(255);
    ellipse(50, 50, 50, 50);
    textSize(20);
    
    //dialog text
    switch(dia_next) {
      case 0:
        text('Oh, Neptune! Are you OK?', ship.pos.x, ship.pos.y - 50);
        text('Mouse click to progress', width/2, 50);
        break;
      case 1:
        text('No.. I\'m too cold..', width - 300 + tremble_x - 40, height/2-50 + tremble_y - 100);
        break;
      case 2:
        text('Sun is too far from me..', width - 300 + tremble_x - 40, height/2-50 + tremble_y - 100);
        break;
      case 3:
        text('You need something hot..', ship.pos.x, ship.pos.y - 50);
        break;
        case 4:
        text('Ah, I will make hot cocoa for you!', ship.pos.x, ship.pos.y - 50);
        break;
        case 5:
        text('Really? Thank you...', width - 300 + tremble_x - 40, height/2-50 + tremble_y - 100);
        break;
        case 6:
        text('But, watch out the asteroids..!', width - 300 + tremble_x - 40, height/2-50 + tremble_y - 100);
        break;
        case 7:
        letsgo = true;
        dialog = false;
        break;
        
    }
    
    pop();

  }

  ship.render();
  ship.turn();
  ship.update();
  ship.edges();

  if (nextScene == true) {
    currentScene++;
    reset();
  }
  }
}

function keyReleased() {
  ship.setRotation(0);
  ship.boosting(false);
}

function keyPressed() {
  if (key == ' ') {
    lasers.push(new Laser(ship.pos, ship.heading));
  } else if (keyCode == RIGHT_ARROW) {
    ship.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW) {
    ship.setRotation(-0.1);
  } else if (keyCode == UP_ARROW) {
    ship.boosting(true);
  }
}

//progress dialog by mouse click
function mousePressed() {
  if (dialog == true && skiplock == false) {
  dia_next++
  }
}

//reset the values
function reset() {
  letsgo = false;
  dialog = false;
  nextScene = false;
  dia_next = 0;
}

//go to the next Scene
function saveScene() {
  currentScene = max(Scene_nums) + 1;
}

//load fonts
function fontload() {
    Cookie_font = loadFont('CookieRun_bold.ttf');
    Cookie_thin_font = loadFont('CookieRun.ttf');
}

//load images
function imageload() {
  img_Star = loadImage('Star.png');
  img_starcocoa = loadImage('starcocoa.png')
  img_Saturn = loadImage('Saturn.png');
  img_Neptune = loadImage('Neptune.png');
  img_Uranus = loadImage('Uranus.png');
  img_Earth = loadImage('Earth.png');
  img_Sun = loadImage('Sun.png');
  img_Sunlight = loadImage('Sunlight.png');
  img_onlycocoa = loadImage('onlycocoa.png');
  img_hurtstar = loadImage('hurtstar.png');
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function stunned() {
  if (stun == true) {
    myTime += deltaTime;
    if (myTime >= 2000) {
      stun = false;
      myTime = 0;
    }
  }
}