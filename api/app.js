import express from 'express';
import logger from 'morgan';
import { AppError, errorCodes, SystemError } from './utils/errors.js';
import ups from './routes/ups.js';
import sdc from './routes/sdc.js';
import guilds from './routes/guilds.js';
import routeToCategory from './middleware/route-to-category.js';
import { initializeDbModels } from './utils/db.js';

const port = Number(process.env.PORT) ?? 3000;
const app = express();

logger.token('body', req => {
	try {
		if (req.method === 'POST' || req.method === 'PUT') {
			return JSON.stringify(req.body);
		} else {
			return null;
		}
	} catch (e) {
		return `Body parse error ${e?.message}` ?? e;
	}
});

if (app.get('env') === 'production') {
	app.use(logger('[:date[clf]] :method :url :status :response-time ms'));
} else if (app.get('env') === 'development' || app.get('env') === 'staging') {
	app.use(logger('[:date[clf]] :method :url :status :body :response-time ms'));
}

// ==== on server start functions
(async function initDb() {
	try {
		await initializeDbModels();
	} catch (e) {
		if (app.get('env') !== 'test') {
			console.log(e);
			console.log('COULD NOT CONNECT TO THE DB, retrying in 5 seconds');
		}
		setTimeout(initDb, 5000);
	}
})();
// ====

app
	.use(express.json())
	.use(express.urlencoded({ extended: true }))
	.use(routeToCategory);

app.use('/ups', ups);
app.use('/sdc', sdc);
app.use('/guilds', guilds);

// Handle 404 AND 500
app
	.use((req, res) => res.status(404).json({ error: { type: 'NOT FOUND', code: 404 } }))
	// eslint-disable-next-line no-unused-vars
	.use((error, req, res, next) => {
		console.error(error);

		if (error instanceof AppError || error instanceof SystemError) {
			res.status(error.status).json(error.toJSON());
		} else if (error.code === 'LIMIT_FILE_SIZE') {
			const error = new AppError(errorCodes.FileTooLarge);
			res.status(error.status).json(error.toJSON());
		} else if (error instanceof Error) {
			res.status(500).json({ message: error.message });
		} else if (error) {
			res.status(500).json(error);
		} else {
			res.status(500).json({ message: 'INTERNAL SERVER ERROR' });
		}
	});

app.listen(port, () => {
	console.log(`Server is running http://localhost:${port}/`);
});
