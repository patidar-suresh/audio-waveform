import './scss/main.scss';
import VU from './VU';
import AudioPlayer from './AudioPlayer';
import Visualizer from './Visualizer';

const AUTOPLAY = false;

const VUs: VU[] = [
	new VU(0, 'Standard RGB', (x, width, arrayBuffer, canvas, ctx) => {
		for (let i = 0; i < arrayBuffer.length; i++) {
			ctx.fillStyle = `hsla(${
				180 - arrayBuffer[i] / 1.5
			}, 100%, 50%, 0.8)`;
			let height = -(arrayBuffer[i] / 8) * 5;

			ctx.fillRect(x, canvas.height, width, height);
			x += width;
			if (x > canvas.width) break;
		}
	}),
];

const canvasEl = document.getElementById('visualizer') as HTMLCanvasElement;
const audioEl = document.getElementById('player');

const player = new AudioPlayer(audioEl);
const visualizer = new Visualizer(canvasEl, VUs, player);

//Bind load and resize for canvas sizing
window.onload = visualizer.load;
window.onresize = visualizer.resize;

//Bind keyboard controls for entire application
window.onkeypress = (e: KeyboardEvent): void => {
	switch (e.code) {
		case 'Space':
			player.togglePlayback();
			break;

		default:
			console.log(e.code);
			break;
	}
};
