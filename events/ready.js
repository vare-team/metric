import log from '../utils/log.js';
import registerCommands from '../utils/register-commands.js';

export default async function (client) {
	await registerCommands(client);

	log(`{READY}`);
}
