import AudioPlayer from './AudioPlayer';
import VU from './VU';

class Visualizer {
	ctx: CanvasRenderingContext2D;
	animationFrame: number;

	constructor(
		public canvas: HTMLCanvasElement,
		public VUs: VU[],
		public player: AudioPlayer
	) {
		this.ctx = canvas.getContext('2d');

		this.player.audio.onplay = (): void => {
			this.draw();
		};
	}

	draw = () => {
		//Request animation frame to call draw function multiple times in a second
		this.animationFrame = requestAnimationFrame(() => this.draw());

		//Get frequency data from analyzer
		let peakArray = new Uint8Array(this.player.analyser.frequencyBinCount);
		this.player.analyser.getByteFrequencyData(peakArray);

		//Create Canvas with background color
		this.ctx.fillStyle = '#2d2d2d';
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		//Draw bars of the waveform
		let width = (this.canvas.width / peakArray.length) * 2;
		let x = 0;

		this.VUs[0].fn(x, width, peakArray, this.canvas, this.ctx);
		//VU_TYPES[VU_TYPE].fn(x, width, peakArray);
	};

	resize = (): void => {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
	};

	load = (): void => {
		this.resize();
	};
}

export default Visualizer;
