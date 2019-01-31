//this a SHAGIA METRIC x RICCO HARVER joint

//Inits

var fft
var song


//Player widget init
var songItems = document.getElementsByClassName("songItem");
var playerArtist = document.getElementById("metaArtist");
var playerSong = document.getElementById("metaSong");
var playControl = document.getElementById("playButton");





function playerControl(event) {
    if (event == false) {
        playControl.querySelector('img').src = "img/ui/pause.png";
    } else if (event == true) {
        playControl.querySelector('img').src = "img/ui/play.png";
    }

}



//Playback
var audioPlaying = false

function setup() {
    //tracklist interaction
function addEventListenerList(list, event, fn) {
    for (var i = 0, len = list.length; i < len; i++) {
        list[i].addEventListener(event, fn, false);
    }
}
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