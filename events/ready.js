import log from '../utils/log.js';
import presenceController from '../utils/presence-controller.js';
import registerCommands from '../utils/register-commands.js';

export default async function(client) {
	await registerCommands(client);
	await presenceController(client)();
	setInterval(presenceController(client), 30e3);

	log(`{READY}`);
};
