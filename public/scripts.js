//Define AnimationFrame variables
const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

//Create the instance of Audio element and set its properties
const audio = new Audio();
audio.src = "./audio/sample.mp3";
audio.controls = true;
audio.loop = false;
audio.autoplay = false;

let analyser,canvas, canvasCtx, animationRequestID;
window.addEventListener("load",() => {
    //Append audio object to the player div so that it is visible on page.
    document.getElementById("player").appendChild(audio);
    
    //Create audio context and analyser.
    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();;
    analyser = audioCtx.createAnalyser()

    //Create canvas context
    canvas = document.getElementById("waveform");
    canvasCtx = canvas.getContext('2d');

    //Connect source to analyzer and then to audio context destination
    let source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

},false);

audio.onplay = function() {
    //Draw waveform
    drawWaveform()
};

audio.onpause = () => {
    //Cancel Animation after a delay of 1 second to let waveform go down smoothly
    setTimeout(() => cancelAnimationFrame(animationRequestID),1000);
}

audio.onended = () => {
    //Cancel Animation after a delay of 1 second to let waveform go down smoothly
    setTimeout(() => cancelAnimationFrame(animationRequestID),1000);
}


//Draw the waveform on canvas using the frequency data from audio source.
function drawWaveform(){
    //Request animation frame to call draw function multiple times in a second
    animationRequestID = requestAnimationFrame(() => drawWaveform());

    //Get frequency data from analyzer
    fbc_array = new Uint8Array(analyser.frequencyBinCount)
    analyser.getByteFrequencyData(fbc_array);

    //Create Canvas with background color
    canvasCtx.fillStyle ='#012d3d';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
    
    //Draw bars of the waveform
    let width = (canvas.width/fbc_array.length) * 2;
    let x = 0;
    for(let i = 0; i < fbc_array.length; i++){        
        let height = -(fbc_array[i] / 2);
        canvasCtx.fillStyle ='#05c8f5';
        canvasCtx.fillRect(x,canvas.height,width,height);
        x += width + 1;
        
        //break as no need to draw bars beyond the canvas width
        if(x > canvas.width)
            break;
    }
}