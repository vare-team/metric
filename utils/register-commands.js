import { SlashCommandBuilder } from 'discord.js';

/**
 *
 * @param client {Client}
 * @return {Promise<void>}
 */
export default async function (client) {
	await client.application.commands.set([
		new SlashCommandBuilder().setName('guilds_added').setDescription('График добавленных северов'),
		new SlashCommandBuilder().setName('guilds_removed').setDescription('График удаленных северов'),
		new SlashCommandBuilder().setName('guilds_count').setDescription('График количества северов'),
		new SlashCommandBuilder().setName('up_count').setDescription('График количества апов'),
	]);
}
