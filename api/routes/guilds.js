import { Router } from 'express';
import { asyncRoute } from '../utils/errors.js';
import getCount from '../controllers/get-count.js';
import guildsUpdate from '../controllers/guilds-update.js';

const router = new Router();

router.route('/').get(asyncRoute(getCount));
router.route('/added').get(asyncRoute(getCount)).put(asyncRoute(guildsUpdate));
router.route('/removed').get(asyncRoute(getCount)).put(asyncRoute(guildsUpdate));

export default router;
