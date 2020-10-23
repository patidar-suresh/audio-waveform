class AudioPlayer {
	ctx: AudioContext;
	analyser: AnalyserNode;
	source: MediaElementAudioSourceNode;
	sourceEl: HTMLSourceElement;
	audio: HTMLAudioElement;
	peakArray: Uint8Array;

	constructor(public audioEl: HTMLElement) {
		this.audio = new Audio();
		this.audio.controls = true;
		this.audio.loop = true;
		this.audio.autoplay = false;

		audioEl.appendChild(this.audio);
		this.ctx = new AudioContext();

		this.analyser = this.ctx.createAnalyser();
		this.analyser.fftSize = Math.pow(2, 9);

		this.source = this.ctx.createMediaElementSource(this.audio);

		this.source.connect(this.analyser);
		this.source.connect(this.ctx.destination);

		this.loadAndDecode('/audio/force.mp3');
	}

	togglePlayback = (): void => {
		if (this.audio.paused) {
			this.audio.play();
		} else {
			this.audio.pause();
		}
	};

	loadAndDecode = (url: string): void => {
		let req = new XMLHttpRequest();
		req.open('GET', url, true);
		req.responseType = 'arraybuffer';
		req.onreadystatechange = (e) => {
			if (req.readyState == 4) {
				if (req.status == 200) {
					let dataView = new DataView(req.response);
					let blob = new Blob([dataView], { type: 'audio/mpeg' });
					this.audio.src = window.URL.createObjectURL(blob);

					//Decode audio data and display waveform
					this.ctx
						.decodeAudioData(req.response)
						.then((buffer) => {
							this.peakArray = new Uint8Array(
								this.analyser.frequencyBinCount
							);
							this.analyser.getByteFrequencyData(this.peakArray);
							//this.audio.play();
						})
						.catch((err) => console.error(err));
				} else
					console.error(
						'error during the load.Wrong url or cross origin issue'
					);
			}
		};
		req.send();
	};
}

export default AudioPlayer;
