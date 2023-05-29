import { Router } from 'express';
import { asyncRoute } from '../utils/errors.js';
import getGuildStat from '../controllers/get-guild-stat.js';

const router = new Router();

router.route('/stat/:guildId').get(asyncRoute(getGuildStat));

router.route('/viewed').put(asyncRoute(getGuildStat));
router.route('/about').put(asyncRoute(getGuildStat));
router.route('/joined').put(asyncRoute(getGuildStat));

export default router;
