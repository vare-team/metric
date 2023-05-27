import respond from '../utils/respond.js';
import { categoriesDictionary } from '../classes/CategoryEnum.js';

export default async function (interaction) {
	const text = 'Всего серверов';
	const category = categoriesDictionary.guilds;

	await respond(interaction, text, category);
}
