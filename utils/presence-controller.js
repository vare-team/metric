import { ActivityType } from 'discord.js';

let presence = 1;

/**
 *
 * @param client {Client}
 * @return {(function(): Promise<void>)|*}
 */
export default function(client) {
	return async () => {
		switch (presence) {
			case 1:
				const guilds = await client.shard.fetchClientValues('guilds.cache.size');
				client.user.setActivity(`${guilds} серверов | m.help`, { type: ActivityType.Watching });
				break;
			case 2:
				client.user.setActivity(`m.help | m.stat`, { type: ActivityType.Listening });
				break;
		}
		presence++;
	};
}
