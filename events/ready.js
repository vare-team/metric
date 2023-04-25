import log from '../utils/log.js';
import registerCommands from '../utils/register-commands.js';
import presenceController from '../utils/presence-controller.js';

export default async function (client) {
	await registerCommands(client);
	await presenceController(client);

	log(`{READY}`);
}
