import SdcStat from '../models/sdc-stat.js';

export default async function (req, res) {
	const [stat, created] = await SdcStat.findOrCreate({
		where: { date: new Date() },
		defaults: { ups: 1 },
	});

	if (!created) await stat.increment(['ups']);
	res.end();
}
