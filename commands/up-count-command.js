import respond from '../utils/respond.js';

export default async function (interaction) {
	const text = 'Всего Апов';
	const category = 'ups';

	await respond(interaction, text, category);
}
