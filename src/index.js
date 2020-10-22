import './scss/main.scss'

//Define AnimationFrame variables
const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

const AUTOPLAY = false;

let VU_TYPE = 0;
let VU_BAR_GAP = 0;
let VU_TYPES = [
    {
        id: 0,
        name: 'Standard RGB',
        fn: (x, width, peakArray) => {
            for (let i = 0; i < peakArray.length; i++) {
                canvasCtx.fillStyle = `hsla(${180 - (peakArray[i] / 1.5)}, 100%, 50%, 0.8)`;
                let height = -(peakArray[i] / 8) * vuModifier;
    
                canvasCtx.fillRect(x, canvas.height, width - VU_BAR_GAP, height);
                x += width + VU_BAR_GAP;
                if (x > canvas.width)
                    break;
            }
        }
    },
    {
        id: 1,
        name: 'Standard',
        fn: (x, width, peakArray) => {
            canvasCtx.fillStyle = `#f1f3f4`;
            
            for (let i = 0; i < peakArray.length; i++) {
                let height = -(peakArray[i] / 8) * vuModifier;
                
                canvasCtx.fillRect(x, canvas.height, width - VU_BAR_GAP, height);
                x += width + VU_BAR_GAP;
                if (x > canvas.width)
                    break;
            }
        }
    },
    {
        id: 2,
        name: 'Standard + Full Greyscale',
        fn: (x, width, peakArray) => {
            for (let i = 0; i < peakArray.length; i++) {
                let height = -(peakArray[i] / 8) * vuModifier;

                canvasCtx.fillStyle = `rgba(255, 255, 255, ${peakArray[i] / 200})`;
                canvasCtx.fillRect(x, canvas.height, width - VU_BAR_GAP, -canvas.height);

                canvasCtx.fillStyle = `#f1f3f4`;
                canvasCtx.fillRect(x, canvas.height, width - VU_BAR_GAP, height);

                x += width + VU_BAR_GAP;
                if (x > canvas.width)
                    break;
            }
        }
    },
    {
        id: 3,
        name: 'Full Greyscale',
        fn: (x, width, peakArray) => {
            for (let i = 0; i < peakArray.length; i++) {
                canvasCtx.fillStyle = `rgba(255, 255, 255, ${peakArray[i] / 200})`;

                canvasCtx.fillRect(x, canvas.height, width - VU_BAR_GAP, -canvas.height);
                x += width + VU_BAR_GAP;
                if (x > canvas.width)
                    break;
            }
        }
    },
    {
        id: 4,
        name: 'Full RGB',
        fn: (x, width, peakArray) => {
            for (let i = 0; i < peakArray.length; i++) {
                canvasCtx.fillStyle = `hsla(${180 - (peakArray[i] / 1.5)}, 100%, 50%, 0.8)`;

                canvasCtx.fillRect(x, canvas.height, width - VU_BAR_GAP, -canvas.height);
                x += width + VU_BAR_GAP;
                if (x > canvas.width)
                    break;
            }
        }
    },
    {
        id: 5,
        name: 'Inverted RGB + Full Greyscale',
        fn: (x, width, peakArray) => {
            for (let i = 0; i < peakArray.length; i++) {
                let height = -(peakArray[i] / 8) * vuModifier;

                canvasCtx.fillStyle = `rgba(255, 255, 255, ${peakArray[i] / 200})`;
                canvasCtx.fillRect(x, canvas.height, width - VU_BAR_GAP, -canvas.height);

                canvasCtx.fillStyle = `hsla(${(peakArray[i] / 1.5)}, 100%, 50%, 0.8)`;
                canvasCtx.fillRect(x, canvas.height, width - VU_BAR_GAP, height);

                x += width + VU_BAR_GAP;
                if (x > canvas.width)
                    break;
            }
        }
    },
]

//Generate menu for VU Types
let VUTypeContainer = document.getElementById('vu_types');

for (let type of VU_TYPES) {
    let radioEl = document.createElement('input');
    let radioElLabel = document.createElement('label');
    let radioId = `vu_type_${type.id}`
    radioElLabel.innerHTML = `&nbsp;${type.name.toString()}`;
    radioElLabel.htmlFor = radioId;
    radioEl.type = 'radio';
    radioEl.id = radioId;
    radioEl.checked = type.id == 0;
    radioEl.name = 'vu_type';
    radioEl.value = type.id.toString()
    VUTypeContainer.appendChild(radioEl);
    VUTypeContainer.appendChild(radioElLabel);
    VUTypeContainer.appendChild(document.createElement('br'));
}

const radios = document.getElementsByName('vu_type');
radios.forEach((radio) => {
    radio.oninput = (e) => {
        VU_TYPE = parseInt(e.target.value);
    }
})

const fileNames = [
    './audio/force.mp3',
    './audio/dont_worry.mp3',
    './audio/mama.mp3',
];

let fileName = fileNames[0];

let canvasWidth = window.innerWidth,
    canvasHeight = window.innerHeight;

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

let player = document.getElementById('audioPlayer');

player.onmouseenter = () => {
    player.classList.add('visible')
}
player.onmouseleave = () => {
    player.classList.remove('visible')
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
        canvasHeight = window.innerHeight;
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

let vuModifier = 3;

document.getElementById('VUSlider2').oninput = (e) => {
    vuModifier = e.target.value;
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
    let peakArray = new Uint8Array(analyser.frequencyBinCount)
    analyser.getByteFrequencyData(peakArray);

    //Create Canvas with background color
    canvasCtx.fillStyle = '#2d2d2d';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    //Draw bars of the waveform
    let width = (canvas.width / peakArray.length) * 2;
    let x = 0;

    VU_TYPES[VU_TYPE].fn(x, width, peakArray);
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