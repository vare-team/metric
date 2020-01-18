const Discord = require('discord.js')
		, client = new Discord.Client({disableEveryone: true, messageCacheMaxSize: 1, messageCacheLifetime: 1, messageSweepInterval: 1, fetchAllMembers: false})
		, fs = require("fs")
		;

let con = require('mysql2').createConnection({user: process.env.dblogin, password: process.env.dbpass, database: "discord", charset: "utf8mb4"});
con.on('error', (err) => {console.warn(err)});
con.connect(() => {client.userLib.sendlog(`{DB Connected} (ID:${con.threadId})`);});
let util = require('mysql-utilities');
util.upgrade(con);
util.introspection(con);

client.userLib = {};

client.userLib.discord = Discord;
client.userLib.db = con;
client.userLib.request = require('request');
client.userLib.promise = require('../SDCBotsModules/promise');
client.userLib.presenseCount = 1;

client.userLib.talkedcool = new Set();

client.userLib.sendlog = (log) => {
	const now = new Date();
	console.log(`${('00' + now.getHours()).slice(-2) + ':' + ('00' + now.getMinutes()).slice(-2) + ':' + ('00' + now.getSeconds()).slice(-2)} | Shard[${client.shard.id}] : ${log}`);
};

client.userLib.sendSDC = (servers, shards) => {
	client.userLib.request.post({url: 'https://api.server-discord.com/v2/bots/'+client.user.id+'/stats', form: {servers, shards}, headers: {'Authorization':'SDC '+process.env.sdc}});
	client.userLib.sendlog('{SDC} Send stats data');
};

client.userLib.presenseFunc = () => {
	switch (client.userLib.presenseCount) {
		case 1:
			client.user.setPresence({ game: { name: `${client.guilds.size} серверов | m.help`, type: 'WATCHING' }});
			break;
		case 2:
			client.user.setPresence({ game: { name: `m.help | m.stat`, type: 'LISTENING' }});
			client.userLib.presenseCount = 0;
			break;
	}

	client.userLib.presenseCount++;
};

con.queryKeyValue('SELECT id, tier FROM admins WHERE 1', (err, result) => client.userLib.admins = result);

fs.readdir("./events/", (err, files) => {
	if (err) return console.error(err);
	files.filter(l => l.endsWith('.js')).forEach(file => {
		try {
			const event = require(`./events/${file}`);
			let eventName = file.split(".")[0];
			client.on(eventName, event.bind(null, client));
			delete require.cache[require.resolve(`./events/${file}`)];
		} catch (e) {console.warn(e)}
	});
});

client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
	if (err) return console.error(err);
	files.filter(l => l.endsWith('.js')).forEach(file => {
		try {
			let props = require(`./commands/${file}`);
			let commandName = file.split(".")[0];
			client.commands.set(commandName, props);
		} catch (e) {console.warn(e)}
	});
});

client.login(process.env.token);