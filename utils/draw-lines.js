export function drawLines(ctx, resolution, dates, lines) {
	ctx.beginPath();
	ctx.lineTo(lines.x, lines.ycalc(dates[Object.keys(dates)[0]], resolution.coff, resolution.min));

	let i = 1, length = Object.keys(dates).length;
	for (; i < length; i++) { //Линии
		let x = lines.x + i * lines.xoff + i;
		let y = lines.ycalc(dates[Object.keys(dates)[i]], resolution.coff, resolution.min);
		ctx.lineTo(x, y);
	}
}
