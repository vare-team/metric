export function drawLines(ctx, resolution, dates, lines) {
	ctx.beginPath();
	ctx.lineTo(lines.x, lines.ycalc(dates[Object.keys(dates)[0]], resolution.coff, resolution.min));

	const length = Object.keys(dates).length;
	for (let i = 1; i < length; i++) {
		//Линии
		const x = lines.x + i * lines.xoff + i;
		const y = lines.ycalc(dates[Object.keys(dates)[i]], resolution.coff, resolution.min);
		ctx.lineTo(x, y);
	}
}
