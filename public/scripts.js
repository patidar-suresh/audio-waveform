//Define AnimationFrame variables
const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

const AUTOPLAY = false;

const fileNames = [
    './audio/force.mp3',
    './audio/dont_worry.mp3',
    './audio/mama.mp3',
];

let fileName = fileNames[0];

let canvasWidth = window.innerWidth,
    canvasHeight = window.innerHeight - 54;

let seekPositionBar = document.getElementById("seekPosition");

//Create the instance of Audio element and set its properties
const audio = new Audio();
audio.controls = true;
audio.loop = true;
audio.autoplay = false;

let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

let analyser, canvas, canvasCtx, animationRequestID, audioPositionTimer;

let playing = false;
window.addEventListener("keypress", (e) => {
    if (e.code === 'Space') {
        if (playing) {
            audio.pause();
            playing = false;
        } else {
            audio.play();
            playing = true;
        }
    }
})

let menuButton = document.getElementById('openOverlay');
let closeButton = document.getElementById('closeOverlay');
let overlay = document.getElementById('overlay');

menuButton.onmouseenter = () => openMenu();
overlay.onmouseleave = () => closeMenu();

const toggleMenu = () => {
    menuButton.classList.toggle('visible');
    overlay.classList.toggle('visible');
}
const openMenu = () => {
    menuButton.classList.remove('visible');
    overlay.classList.add('visible');
}
const closeMenu = () => {
    menuButton.classList.add('visible');
    overlay.classList.remove('visible');
}

window.addEventListener("load", () => {
    //Append audio object to the player div so that it is visible on page.
    document.getElementById("player").appendChild(audio);

    //Create audio analyser.    
    analyser = audioCtx.createAnalyser()
    analyser.fftSize = Math.pow(2, 10);

    //Create canvas context
    canvas = document.getElementById("analyzer");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvasCtx = canvas.getContext('2d');

    window.onresize = () => {
        canvasWidth = window.innerWidth;
        canvasHeight = window.innerHeight - 54;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
    }

    //Connect source to analyzer and then to audio context destination
    let source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    source.connect(audioCtx.destination);

}, false);

document.getElementById('VUSlider').oninput = (e) => {
    analyser.fftSize = Math.pow(2, e.target.value);
}

let vuHeightMultiplier = 3;

document.getElementById('VUSlider2').oninput = (e) => {
    vuHeightMultiplier = e.target.value;
}

document.getElementById('songSelector').onchange = (e) => {
    loadAudio(fileNames[parseInt(e.target.value)]);
}

//Attach callback for different audio events.
audio.onplay = function () {
    //Draw waveform
    drawAnalyzer();  
};

audio.onpause = () => {
    //Cancel Animation after a delay of 1 second to let waveform go down smoothly
    setTimeout(() => cancelAnimationFrame(animationRequestID), 1000);    
}

audio.onended = () => {
    //Cancel Animation after a delay of 1 second to let waveform go down smoothly
    setTimeout(() => cancelAnimationFrame(animationRequestID), 1000);
}

audio.ontimeupdate = () => {
    let percentage = audio.currentTime / audio.duration;
}


//Draw the waveform on canvas using the frequency data from audio source.
function drawAnalyzer() {
    //Request animation frame to call draw function multiple times in a second
    animationRequestID = requestAnimationFrame(() => drawAnalyzer());

    //Get frequency data from analyzer
    fbc_array = new Uint8Array(analyser.frequencyBinCount)
    analyser.getByteFrequencyData(fbc_array);

    //Create Canvas with background color
    canvasCtx.fillStyle = '#2d2d2d';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    //Draw bars of the waveform
    let width = (canvas.width / fbc_array.length) * 2;
    let x = 0;
    for (let i = 0; i < fbc_array.length; i++) {
        let height = -(fbc_array[i] / 8) * vuHeightMultiplier;
        canvasCtx.fillStyle = '#f1f3f4';
        canvasCtx.fillRect(x, canvas.height, width, height);
        x += width;
        //break as no need to draw bars beyond the canvas width
        if (x > canvas.width)
            break;
    }
}

//Load audio using AJAX
function loadAudio(url) {
    let req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = "arraybuffer";
    req.onreadystatechange = function (e) {
        if (req.readyState == 4) {
            if (req.status == 200) {
                //Since response is array buffer, Convert it to blob so that it can be set as audio src.
                let dataView = new DataView(req.response);
                let blob = new Blob([dataView], { type: "audio/mpeg" });
                audio.src = window.URL.createObjectURL(blob);

                //Decode audio data (arraybuffer) and display waveform
                audioCtx.decodeAudioData(req.response,
                    function (buffer) {
                        if (AUTOPLAY) {
                            audio.play();
                            playing = true;
                        }
                    }, () => { console.error('error in decoding'); });
            }
            else
                console.error('error during the load.Wrong url or cross origin issue');
        }
    };
    req.send();
}



//Call method to load audio data
loadAudio(fileName);