import respond from '../utils/respond.js';

export default async function(interaction) {
	const text = 'Новых серверов на сайте';
	const category = 'added';

	await respond(interaction, text, category);
}
