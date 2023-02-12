import Discord, { GatewayIntentBits } from 'discord.js';
import ready from './events/ready.js';
import onInteractionCreate from './events/on-interaction-create.js';

const config = {
	intents: GatewayIntentBits.Guilds,
};
const client = new Discord.Client(config);

client.on('ready', ready);
client.on('interactionCreate', onInteractionCreate);

client.login(process.env.token).then();
