import respond from '../utils/respond.js';
import { categoriesDictionary } from '../classes/CategoryEnum.js';

export default async function (interaction) {
	const text = 'Ушедших серверов';
	const category = categoriesDictionary.removed;

	await respond(interaction, text, category);
}
