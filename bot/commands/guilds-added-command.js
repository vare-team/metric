import respond from '../utils/respond.js';
import { categoriesDictionary } from '../classes/CategoryEnum.js';

export default async function (interaction) {
	const text = 'Новых серверов на сайте';
	const category = categoriesDictionary.added;

	await respond(interaction, text, category);
}
