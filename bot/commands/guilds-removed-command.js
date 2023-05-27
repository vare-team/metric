import respond from '../utils/respond.js';

export default async function (interaction) {
	const text = 'Ушедших серверов';
	const category = 'removed';

	await respond(interaction, text, category);
}
