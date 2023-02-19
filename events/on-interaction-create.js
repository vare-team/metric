import guildsAddedCommand from '../commands/guilds-added-command.js';
import guildsRemovedCommand from '../commands/guilds-removed-command.js';
import guildsCountCommand from '../commands/guilds-count-command.js';
import upCountCommand from '../commands/up-count-command.js';

const talkedCool = new Set();

export default async function (interaction) {
	if (!interaction.isCommand()) return;
	const name = interaction.command.name;
	const command = commands[name];

	if (!command) return;

	const temp = `${interaction.user.id}${name}`;
	if (talkedCool.has(temp)) {
		await interaction.reply({
			content: 'Ошибка! Немного подождите перед использованием этой команды.',
			ephemeral: false,
		});
		return;
	}

	talkedCool.add(temp);
	setTimeout(() => {
		talkedCool.delete(temp);
	}, 5e3);

	await interaction.deferReply({ ephemeral: true });
	await command(interaction);
}

/**
 *
 * @type {Object<string, (function(): Promise<*>)|*>}
 */
export const commands = {
	guilds_added: guildsAddedCommand,
	guilds_removed: guildsRemovedCommand,
	guilds_count: guildsCountCommand,
	up_count: upCountCommand,
};
