import respond from '../utils/respond.js';

export default async function (interaction) {
	const text = 'Всего серверов';
	const category = 'guilds';

	await respond(interaction, text, category);
}
