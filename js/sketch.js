// this a SHAGIA METRIC x RICCO HARVER joint

// Inits

var fft
var song


// Player widget init
var songItems = document.getElementsByClassName("songItem");
var playerArtist = document.getElementById("metaArtist");
var playerSong = document.getElementById("metaSong");
var playControl = document.getElementById("playButton");





// Player logic image init
function playerControl(event) {
    if (event == false) {
        playControl.querySelector('img').src = "img/ui/pause.png";
    } else if (event == true) {
        playControl.querySelector('img').src = "img/ui/play.png";
    }

}

// Please, always remember to GET the Audio Context first, and then check if it's running after you trigger any type of gesture, in accordance to Chrome 66, and THEN play it.
function touchStarted() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}

// function to add multiple listeners to classes -- really nice!
function addEventListenerList(list, event, fn) {
    for (var i = 0, len = list.length; i < len; i++) {
        list[i].addEventListener(event, fn, false);
    }
}



// Playback engine and meta grabbing
var audioPlaying = false

function setup() {
    //tracklist interaction

    var root = createCanvas(windowWidth, windowHeight);
    root.parent('bg');

    // default mode is radians
    angleMode(DEGREES);
    translate(width / 2, height / 2);
    fft = new p5.FFT(0.5, 128);

    //Main audio function
    addEventListenerList(songItems, 'click', function() {
      var context = new AudioContext();

        if (audioPlaying === false) {
            var curAudio = this.querySelector('audio').src;
            var curArtist = this.querySelector('.listArtist').textContent;
            var curPlay = this.querySelector('.listSong').textContent;

            song = createAudio(curAudio);

            song.crossOrigin = "Anonymous";
            fft.setInput(song);

            function touchStarted() {
                context.resume()
            }

            function mousePressed() {
                context.resume()
            }
            song.play();
            audioPlaying = true
            playerControl(false);
            playerSong.innerHTML = curPlay;
            playerArtist.innerHTML = curArtist;


        } else if (audioPlaying === true) {

            song.stop();
            audioPlaying = false

            var curAudio = this.querySelector('audio').src;
            var curArtist = this.querySelector('.listArtist').textContent;
            var curPlay = this.querySelector('.listSong').textContent;

            song = createAudio(curAudio);



            song.crossOrigin = "Anonymous";
            fft.setInput(song);



            function touchStarted() {
                context.resume()
            }

            function mousePressed() {
                context.resume()
            }
            song.play();
            audioPlaying = true
            playerSong.innerHTML = curPlay;
            playerArtist.innerHTML = curArtist;


        }
    });



};


// The actual player logic
playControl.addEventListener('click', function() {
    if (audioPlaying == false) {

        song.play();
        audioPlaying = true;
        playerControl(false);


    } else if (audioPlaying == true) {
        song.pause();
        audioPlaying = false;
        playerControl(true);

    }
})

// Draw the audio spectrum! Will add a normalizer soon...
function draw() {

    background(0);
    fill(216, 216, 216);
    stroke(216, 216, 216, 100);

    var spectrum = fft.analyze(256 * 2);

    beginShape();

    for (var i = 0; i < spectrum.length; i++) {
        var angle = map(i, 0, spectrum.length, 0, 360);
        var amp = spectrum[i] / 2;
        var r = map(amp + 20, 2, 512, 0, 500, amp);
        var x = r * cos(angle);
        var y = r * sin(angle);
        vertex(x, y);
    }

    endShape(CLOSE);

}