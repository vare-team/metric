import { AppErrorInvalid, AppErrorMissing } from '../utils/errors.js';
import statCategories from '../configs/stat-categories.js';
import setStat from '../utils/set-stat.js';

export default async function ({ category, params: { guildId } }, res) {
	if (!guildId) throw new AppErrorMissing('guildId');
	if (!category) throw new AppErrorMissing('category');
	if (!statCategories.includes(category)) throw new AppErrorInvalid('category');

	await setStat(guildId, [category]);
	res.end();
}
