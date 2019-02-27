let phase;
let mic;
let zoff;
let res = 500;
let colorSpeed = 10;
let sensitivity = 150;
let mode;
let socket;

function setup() {
  createCanvas(windowWidth, windowHeight);
  phase = 0;
  zoff = 0;
  mic = new p5.AudioIn();
  background(0);
  mic.start();
  mode = 'white';
  socket = io.connect('http://localhost:3002');
  socket.on('mode', data => {
    mode = data.mode;
    console.log(data.mode);
  });
  socket.on('sensitivity', data => {
    sensitivity = data.sensitivity;
    console.log(data.sensitivity);
  });
}

function draw() {
  noiseSeed(666);
  translate(width / 2, height / 2);
  noFill();
  let noiseMax = mic.getLevel() * sensitivity;
  let h = 0;
  let s = 0;
  if (mode === 'noise') {
    // 2
    h = (noise(phase * colorSpeed) * 2 * 255) % 255;
    s = 255;
    strokeWeight(2);
    colorMode(RGB);
    background(0, 40);
  } else if (mode === 'random') {
    // 1
    h = random(255);
    s = 255;
    strokeWeight(2);
    colorMode(RGB);
    background(0, 40);
  } else if (mode === 'sound') {
    // 4
    h = map(noiseMax, 0, 50, 255, 0);
    s = 255;
    colorMode(RGB);
    strokeWeight(2);
    if (noiseMax > 40) {
      background(255, 0, 0, 40);
    } else {
      background(0, 40);
    }
  } else if (mode === 'color') {
    // 5
    colorMode(HSB);
    background(map(noiseMax, 0, 50, 255, 0), 255, 255);
    strokeWeight(5);
  } else if (mode === 'white') {
    // default / 3
    colorMode(RGB);
    strokeWeight(2);
    background(0, 40);
  } else if (mode === 'bubble') {
    // 6
    h = map(noiseMax, 0, 50, 255, 0);
    s = 255;
    colorMode(RGB);
    strokeWeight(8);
    background(0, 40);
  } else if (mode === 'circle') {
    // 6
    h = map(noiseMax, 0, 50, 255, 0);
    s = 255;
    colorMode(RGB);
    strokeWeight(8);
    if (noiseMax > 40) {
      background(255, 0, 0, 40);
    } else {
      background(0, 40);
    }
  }
  colorMode(HSB);
  stroke(h, s, 255);
  rtrans = map(noiseMax, 0, 50, 0.8, 1.4);
  pts = map(noiseMax, 0, 50, res / 2, res);
  beginShape();
  if (mode === 'bubble') {
    for (let a = 0; a < TWO_PI; a += TWO_PI / 500) {
      let xoff = map(cos(a + phase), -1, 1, 0, 0.3);
      let yoff = map(sin(a + phase), -1, 1, 0, 0.3);
      let r = map(noise(xoff, yoff, zoff), 0, 1, 100, height / 2);
      let x = r * cos(a);
      let y = r * sin(a);
      vertex(x, y);
    }
  } else if (mode === 'circle') {
    rtrans = map(noiseMax, 0, 50, 0.1, 1);
    for (let a = 0; a < TWO_PI; a += TWO_PI / 500) {
      let xoff = 1;
      let yoff = 1;
      let r = (rtrans * height) / 2;
      let x = r * cos(a);
      let y = r * sin(a);
      vertex(x, y);
    }
  } else {
    for (let a = 0; a < TWO_PI; a += TWO_PI / pts) {
      let xoff = map(cos(a + phase), -1, 1, 0, noiseMax);
      let yoff = map(sin(a + phase), -1, 1, 0, noiseMax);
      let r = rtrans * map(noise(xoff, yoff, zoff), 0, 1, 100, height / 2);
      let x = r * cos(a);
      let y = r * sin(a);
      vertex(x, y);
    }
  }
  endShape(CLOSE);
  phase += 0.01;
  zoff += 0.01;
}

function keyPressed() {
  if (key === '1') {
    mode = 'random';
  }
  if (key === '2') {
    mode = 'noise';
  }
  if (key === '3') {
    mode = 'white';
  }
  if (key === '4') {
    mode = 'sound';
  }
  if (key === 'd') {
    mode = 'color';
  }
  if (key === '5') {
    mode = 'bubble';
  }
  if (key === '6') {
    mode = 'circle';
  }
  if (key === '=') {
    sensitivity += 5;
  }
  if (key === '-') {
    sensitivity -= 5;
  }
}

function changeMode(name) {
  mode = name;
}
