import { createCanvas, loadImage, registerFont } from 'canvas';
import Resolution from '../classes/Resolution.js';
import Lines from '../classes/Lines.js';
import { drawLines } from './draw-lines.js';
import { drawCircles } from './draw-circles.js';
import { drawText } from './draw-text.js';
import db from '../services/db.js';
import CategoryEnum from '../classes/CategoryEnum.js';

registerFont('./DINPro.ttf', { family: 'Comic Sans' });
const dotsCount = 11;
const lines = new Lines(530, 329, 35, 367, 52, 32);

/**
 * @param text {String}
 * @param category {String}
 * @return {Promise<Buffer>}
 */
export default async function generateAttachment(text, category) {
	if (!CategoryEnum.validate(category)) throw 'Category validation error';

	const dates = {};
	const days = new Date();

	days.setHours(0, 0, 0);
	days.setDate(days.getDate() - dotsCount);

	const dbResult = await db.many('SELECT date, ?? FROM sdcstat WHERE date > ? ORDER BY date DESC;', [category, days]);

	days.setDate(days.getDate() + 1);

	for (let i = 0; i < dotsCount; i++) {
		let flag = 1;
		let sort = 0;
		const length = dbResult.length;

		for (let j = 0; j < length; j++) {
			if (days.getDate() === dbResult[j].date.getDate()) {
				flag = 0;
				sort = dbResult[j][category];
			}
		}

		dates[('00' + days.getDate()).slice(-2) + '.' + ('00' + (days.getMonth() + 1)).slice(-2)] = flag ? 0 : sort;
		days.setDate(days.getDate() + 1);
	}

	const canvas = createCanvas(600, 400);
	const ctx = canvas.getContext('2d');
	const resolution = Resolution.createFromDates(dates, lines);

	ctx.drawImage(await loadImage('./sdctable.png'), 0, 0, 600, 400); //Задний фон

	ctx.strokeStyle = '#FFFFFF';
	ctx.fillStyle = '#FFFFFF';
	ctx.lineWidth = 2;

	drawLines(ctx, resolution, dates, lines);
	drawCircles(ctx, dates, resolution, lines);
	drawText(text, ctx, canvas.width, resolution, dates, dotsCount, lines);

	return canvas.toBuffer();
}
