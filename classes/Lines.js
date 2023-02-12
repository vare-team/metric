export default class Lines {
	/**
	 *
	 * @param width {number}
	 * @param height {number}
	 * @param x {number}
	 * @param y {number}
	 * @param xoff {number}
	 * @param yoff {number}
	 */
	constructor(width, height, x, y, xoff, yoff) {
		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;
		this.xoff = xoff;
		this.yoff = yoff;
	}

	ycalc = (number, coff, min) => {
		return this.y - ((number - min) * this.yoff + (number - min)) / coff;
	};
}
