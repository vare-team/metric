import { Router } from 'express';
import { asyncRoute } from '../utils/errors.js';
import getCount from '../controllers/get-count.js';
import upsUpdate from '../controllers/ups-update.js';

const router = new Router();

router.route('/').get(asyncRoute(getCount)).put(asyncRoute(upsUpdate));

export default router;
