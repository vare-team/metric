import { ActivityType } from 'discord.js';

let presence = 1;

/**
 *
 * @param client {Client}
 * @return {(function(): Promise<void>)|*}
 */
export default function (client) {
	return async () => {
		if (presence === 1) {
			await client.guilds.fetch();
			client.user.setActivity(`${client.guilds.cache.size} серверов | m.help`, { type: ActivityType.Watching });
		} else if (presence === 2) {
			client.user.setActivity(`m.help | m.stat`, { type: ActivityType.Listening });
		}
		presence++;
	};
}
