import { Router } from 'express';
import { asyncRoute } from '../utils/errors.js';
import getGuildStat from '../controllers/get-guild-stat.js';
import setGuildStat from '../controllers/set-guild-stat.js';

const router = new Router();

router.route('/stat').get(asyncRoute(getGuildStat));

router.route('/viewed').put(asyncRoute(setGuildStat));
router.route('/about').put(asyncRoute(setGuildStat));
router.route('/joined').put(asyncRoute(setGuildStat));

export default router;
