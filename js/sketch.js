//this a SHAGIA METRIC x RICCO HARVER joint

//Inits
var fft
var song
var songItems = document.getElementsByClassName("songItem");

function addEventListenerList(list, event, fn) {
    for (var i = 0, len = list.length; i < len; i++) {
        list[i].addEventListener(event, fn, false);
    }
}
//Playback
var audioPlaying = false

function setup() {
  var root = createCanvas(windowWidth, windowHeight);
  root.parent('bg');

  // default mode is radians
  angleMode(DEGREES);
  translate(width/2, height/2);

  
  fft = new p5.FFT(0.5, 128);
  
  addEventListenerList(songItems, 'click', function() {
  console.log(this.querySelector('audio').src);

  var curAudio = this.querySelector('audio').src;
  song = createAudio(curAudio);
  fft.setInput(song);
  song.play();

});

  
  
};

function draw() {

  background(0);
  fill(216, 216, 216);
  stroke(216, 216, 216, 100);

  //var spectrum = fft.analyze(128);
  var spectrum = fft.analyze(256 * 2);
  //console.log(spectrum);

 beginShape();

  for (var i = 0; i < spectrum.length; i++) {
  	var angle = map(i, 0, spectrum.length, 0, 360);
  	//var amp = fft.analyze(256)[i];
    var amp = spectrum[i] / 2;
  	//var r = map(amp, 2, 512, 0, 500);
    var r = map(amp + 20, 2, 512, 0, 500, amp);
    var x = r * cos(angle);
    var y = r * sin(angle);
    vertex(x, y);
    //triangle(0, 0, x, y);
    //curveVertex(x, y);
  }

  endShape(CLOSE);

}

