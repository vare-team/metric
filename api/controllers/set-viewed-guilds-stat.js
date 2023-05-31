import { AppErrorInvalid, AppErrorMissing } from '../utils/errors.js';
import setStat from '../utils/set-stat.js';

/**
 *
 * @param guildIds {[string]}
 * @param res
 * @return {Promise<void>}
 */
export default async function ({ body: { guildIds } }, res) {
	if (!guildIds) throw new AppErrorMissing('guildIds');
	if (guildIds.length < 1) throw new AppErrorInvalid('guildIds');

	for (const guildId of guildIds) {
		await setStat(guildId, ['viewed']);
	}
	res.end();
}
