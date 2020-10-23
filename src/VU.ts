class VU {
	constructor(
		public id: number,
		public name: string,
		public fn: (
			x: number,
			width: number,
			peakArray: Uint8Array,
			canvas: HTMLCanvasElement,
			ctx: CanvasRenderingContext2D
		) => void
	) {}
}

export default VU;
