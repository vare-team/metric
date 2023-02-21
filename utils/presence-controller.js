import { ActivityType } from 'discord.js';

/**
 *
 * @param client {Client}
 * @return {(function(): Promise<void>)|*}
 */
export default function (client) {
	return async () => {
		await client.guilds.fetch();
		client.user.setActivity(`${client.guilds.cache.size} серверов`, { type: ActivityType.Watching });
	};
}
