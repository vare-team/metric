import { ActivityType } from 'discord.js';

/**
 *
 * @param client {Client}
 * @return {(function(): Promise<void>)|*}
 */
export default async function (client) {
	await client.user.setActivity(`на статистику`, { type: ActivityType.Watching });
}
