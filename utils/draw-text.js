export function drawText(text, ctx, canvasWidth, resolution, dates, dotsCount, lines) {
	ctx.font = '8px DinPro';
	ctx.fillStyle = '#FFFFFF';

	for (let i = 0; i < dotsCount; i++) {
		// Текст
		let txt = Math.round((resolution.step * i + resolution.min) * 10) / 10;
		let x = 22 - ctx.measureText((Math.round((resolution.step * i + resolution.min) * 10) / 10).toString()).width;
		let y = lines.y - lines.yoff * i - i - 2;
		ctx.fillText(txt.toString(), x, y); //Шаги

		txt = Object.keys(dates)[i];
		x = lines.x + i * lines.xoff + i - ctx.measureText(Object.keys(dates)[i]).width / 2;
		y = 395;
		ctx.fillText(txt, x, y); //Даты
	}

	let x = 19;
	do {
		ctx.font = `${(x -= 1)}px DinPro`;
	} while (ctx.measureText(text).width > 545);

	ctx.fillStyle = '#FFFFFF';
	ctx.fillText(text, canvasWidth / 2 - ctx.measureText(text).width / 2, 23);
}
