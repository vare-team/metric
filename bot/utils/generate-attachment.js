import { createCanvas, loadImage, registerFont } from 'canvas';
import Resolution from '../classes/Resolution.js';
import Lines from '../classes/Lines.js';
import { drawLines } from './draw-lines.js';
import { drawCircles } from './draw-circles.js';
import { drawText } from './draw-text.js';
import CategoryEnum from '../classes/CategoryEnum.js';
import getApiInfo from '../services/get-api-info.js';

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
	const dbResult = await getApiInfo(category, dotsCount);
	const dbEntries = Object.entries(dbResult);

	for (const [k, v] of dbEntries) {
		const date = new Date(k);
		dates[('00' + date.getDate()).slice(-2) + '.' + ('00' + (date.getMonth() + 1)).slice(-2)] = v;
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
	drawText(text, ctx, canvas.width, resolution, dates, dbEntries.length, lines);

	return canvas.toBuffer();
}
