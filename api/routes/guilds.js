import { Router } from 'express';
import { asyncRoute } from '../utils/errors.js';
import getGuildStat from '../controllers/get-guild-stat.js';
import setGuildStat from '../controllers/set-guild-stat.js';
import setViewedGuildsStat from '../controllers/set-viewed-guilds-stat.js';

const router = new Router();

router.route('/viewed').put(asyncRoute(setViewedGuildsStat));

router.route('/:guildId').get(asyncRoute(getGuildStat));
router.route('/:guildId/about').put(asyncRoute(setGuildStat));
router.route('/:guildId/joined').put(asyncRoute(setGuildStat));

export default router;
