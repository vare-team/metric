export default class Resolution {
	/**
	 *
	 * @param max {number}
	 * @param min {number}
	 * @param avg {number}
	 * @param step {number}
	 * @param coff {number}
	 */
	constructor(max, min, avg, step, coff) {
		this.max = max;
		this.min = min;
		this.avg = avg;
		this.step = step;
		this.coff = coff;
	}

	/**
	 *
	 * @param dates {Object}
	 * @param lines {Lines}
	 * @return {Resolution}
	 */
	static createFromDates(dates, lines) {
		const max = Math.max.apply(null, Object.values(dates));
		const min = Math.min.apply(null, Object.values(dates));
		const avg = (max + min) / Object.keys(dates).length;
		const step = (max - min) / 10;
		const coff = ((max - min) * lines.yoff + (max - min)) / lines.height;

		return new Resolution(max, min, avg, step, coff);
	}
}
