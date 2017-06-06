//Define AnimationFrame variables
const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

const fileName = "./audio/sample.mp3";

const canvasWidth = 750, canvasHeight = 100;

let seekPositionBar = document.getElementById("seekPosition");

//Create the instance of Audio element and set its properties
const audio = new Audio();
audio.controls = true;
audio.loop = false;
audio.autoplay = false;

let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

let analyser, canvas, canvasCtx, animationRequestID, audioPositionTimer;

window.addEventListener("load", () => {
    //Append audio object to the player div so that it is visible on page.
    document.getElementById("player").appendChild(audio);

    //Create audio analyser.    
    analyser = audioCtx.createAnalyser()

    //Create canvas context
    canvas = document.getElementById("analyzer");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvasCtx = canvas.getContext('2d');

    //Connect source to analyzer and then to audio context destination
    let source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    source.connect(audioCtx.destination);

}, false);


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
    let percentage = audio.currentTime / audio.duration * 100;
    seekPositionBar.style.left = percentage + '%';
}


//Draw the waveform on canvas using the frequency data from audio source.
function drawAnalyzer() {
    //Request animation frame to call draw function multiple times in a second
    animationRequestID = requestAnimationFrame(() => drawAnalyzer());

    //Get frequency data from analyzer
    fbc_array = new Uint8Array(analyser.frequencyBinCount)
    analyser.getByteFrequencyData(fbc_array);

    //Create Canvas with background color
    canvasCtx.fillStyle = '#012d3d';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    //Draw bars of the waveform
    let width = (canvas.width / fbc_array.length) * 2;
    let x = 0;
    for (let i = 0; i < fbc_array.length; i++) {
        let height = -(fbc_array[i] / 2);
        canvasCtx.fillStyle = '#05c8f5';
        canvasCtx.fillRect(x, canvas.height, width, height);
        x += width + 1;
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
                        console.log('Channels:' + buffer.numberOfChannels);
                        displayBuffer(buffer);
                    }, () => { console.error('error in decoding'); });
            }
            else
                console.error('error during the load.Wrong url or cross origin issue');
        }
    };
    req.send();
}



//Display channel wise waveform from the audio buffer
function displayBuffer(buff /* is an AudioBuffer */) {

    let container = document.getElementById("waveformContainer");
    seekPositionBar.style.height = (buff.numberOfChannels * 100) + 'px';
    seekPositionBar.style.bottom = -(135 + buff.numberOfChannels * 100) + 'px';
    seekPositionBar.style.display = "block";
    for (let channel = 0; channel < buff.numberOfChannels; channel++) {
        let canvas = document.createElement('canvas');
        canvas.id = "waveform" + channel;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        container.appendChild(canvas);

        let channelData = buff.getChannelData(channel);
        createChannelWaveform(canvas, channelData);
    }
}

// Draw channel waveform on Canvas
function createChannelWaveform(canvas, channelData) {
    var drawLines = 1000;

    let canvasWidth = canvas.width, canvasHeight = canvas.height;
    let context = canvas.getContext('2d');

    var lineOpacity = canvasWidth / channelData.length;
    context.save();
    context.fillStyle = '#080808';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    context.strokeStyle = '#46a0ba';
    context.globalCompositeOperation = 'lighter';
    context.translate(0, canvasHeight / 2);
    //context.globalAlpha = 0.6 ; // lineOpacity ;
    context.lineWidth = 1;
    var totallength = channelData.length;
    var eachBlock = Math.floor(totallength / drawLines);
    var lineGap = (canvasWidth / drawLines);

    context.beginPath();
    for (var i = 0; i <= drawLines; i++) {
        var audioBuffKey = Math.floor(eachBlock * i);
        var x = i * lineGap;
        var y = channelData[audioBuffKey] * canvasHeight / 2;
        context.moveTo(x, y);
        context.lineTo(x, (y * -1));
    }
    context.stroke();
    context.restore();
}

//Call method to load audio data
loadAudio(fileName);