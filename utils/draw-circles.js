export function drawCircles(ctx, dates, resolution, lines) {
	const radius = 4;
	const startAngle = 0;
	const endAngle = 2 * Math.PI;

	ctx.stroke();
	ctx.beginPath();

	let x = lines.x;
	let y = lines.ycalc(dates[Object.keys(dates)[0]], resolution.coff, resolution.min);
	ctx.arc(x, y, radius, startAngle, endAngle);
	ctx.fill();

	let i = 1, length = Object.keys(dates).length;
	for (; i < length; i++) { //Кружки
		ctx.beginPath();

		x = lines.x + i * lines.xoff + i;
		y = lines.ycalc(dates[Object.keys(dates)[i]], resolution.coff, resolution.min);
		ctx.arc(x, y, radius, startAngle, endAngle);
		ctx.fill();
	}
}
