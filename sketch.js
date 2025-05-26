function setup() {
 createCanvas(windowWidth, 200);

  userStartAudio();
  mic = new p5.AudioIn();
  mic.start();

}

let mic;
let theme;

function draw() {
  theme = getThemeColors();
  background(theme.sky);

  drawSunOrMoon();
  drawStarsIfNight();
  drawSand();
  drawWaves();
}


//Day or Night Theme function
function getThemeColors() {
  //let hour = 18// testing line
  let hour = new Date().getHours(); 
  // if condtion is used to switch between day and         night
  //Sunrise: 6 AM to 7.59am
  if (hour >= 6 && hour < 8) {
    return {
      sky: '#DA853A',       
      sun: '#ECCB46',       
      sand: '#A7572D',       
      wave: '#E4CC9F',       
      waveFill: '#4d9bb9', 
      isDay: true
    };
  }

  //Day: 8 AM to 5.59 PM
  else if (hour >= 8 && hour < 18) {
    return {
      sky: '#D5EBF5',        
      sun: '#f7d35f',       
      sand: '#f2c47e',       
      wave: '#DAE8F5',       
      waveFill: '#4d9bb9',   
      isDay: true
    };
  }

  //Night: 6 PM to 5.59AM
  else {
    return {
      sky: '#132a48',       
      sun: '#FFFFFF',       
      sand: '#7e6144',      
      wave: '#C1DBEE',      
      waveFill: '#124666',   
      isDay: false
    };
  }
}

// Drawing the sun or moon
function drawSunOrMoon() {
  noStroke();
  fill(theme.sun);
  if (theme.isDay) {
    ellipse(width - 100, 55, 80); // Sun
  } else {
    ellipse(width - 100, 55, 40); // Moon
  }
}

function drawStarsIfNight() {
  if (!theme.isDay) {
    fill(255);
    noStroke();

    // Using 'for' to start the loop.
    // 'let i = 0' means it starts counting from 0.
    // The loop keeps running as long as 'i' is less         than 10.
    // 'i++' means I'm adding 1 to 'i' after each loop.
    // Each time the loop runs, it draws one circle.
    // So in total, 10 stars are being drawn in random         positions.
    for (let i = 0; i < 10; i++) {
      circle(random(width), random(height / 2),               random(1, 4));
    }
  }
}

//Sand
function drawSand() {
  noStroke();
  fill(theme.sand);
  rect(0, height - 60, width, 60);
}

//Waves move based on mic input
function drawWaves() {
  let volume = mic.getLevel();
  let waveHeight = map(volume, 0, 0.3, 10, 100);
  
 if (waveHeight > 30) {
  waveHeight = 30;
  }
  
  console.log(volume);
  console.log(waveHeight);
  
  //Draw filled base water
  noStroke();
  fill(theme.waveFill);
  rect(0, height - 80, width, 40);

  noFill();
  stroke(theme.wave);
  strokeWeight(2);

  for (let y = height -  80; y < height - 40; y += 10) {
    beginShape();
  for (let x = 0; x <= width; x += 10) { 
    let noiseVal = noise(x * 0.01, y * 0.01, 
    frameCount   * 0.01);
    let yOffset = map(noiseVal, 0, 1, -waveHeight,           waveHeight);
    vertex(x, y + yOffset);
  }
  endShape();
}
}


