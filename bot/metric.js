import Discord, { GatewayIntentBits } from 'discord.js';
import ready from './events/ready.js';
import onInteractionCreate from './events/on-interaction-create.js';
import log from './utils/log.js';

const client = new Discord.Client({ intents: GatewayIntentBits.Guilds });

client.on('ready', ready);
client.on('interactionCreate', onInteractionCreate);

client.login(process.env.TOKEN).then(() => log('Авторизация...'));
