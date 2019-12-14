module.exports = (client, msg) => {

	if (msg.author.bot) return;

	if (!msg.content.toLowerCase().startsWith('m.')) {
		client.userLib.db.query('INSERT INTO statistic (id, date, msg) VALUES (?, ?, 1) ON DUPLICATE KEY UPDATE msg = msg + 1', [msg.guild.id, new Date]);
		return;
	}

	if (msg.channel.type == 'dm') {
		msg.channel.send("Команды недоступны в личных сообщениях.");
		return;
	}

	if (!msg.channel.permissionsFor(client.user).has("EMBED_LINKS")) {
		msg.reply(`У меня нет разрешения отправлять ссылки в данном канале. Без него я не смогу работать тут.`);
		return;
	}

	const [command, ...args] = msg.content.slice(2).trim().split(/ +/g);
	const cmd = client.commands.get(command.toLowerCase());
	if (!cmd) return;

	if (Object.keys(client.userLib.admins).indexOf(msg.author.id) == -1 && cmd.help.tier) return;

	if (cmd.help.tier && client.userLib.admins[msg.author.id] != 0 && cmd.help.tier <= client.userLib.admins[msg.author.id]) {
		msg.author.send('У вас недостаточно прав!');
		return;
	}

	if (cmd.help.args && !args.length) {
		msg.reply("Ошибка! Отстутствует аргумент команды!");
		return;
	}

	let temp = `${msg.guild.id}${msg.author.id}${cmd.help.name}`;
	if (client.userLib.talkedcool.has(temp)) {
		return;
		msg.reply("Ошибка! Немного подождите перед использованием этой команды.");
	}
	client.userLib.talkedcool.add(temp);
	setTimeout(() => {client.userLib.talkedcool.delete(temp);}, cmd.help.cooldown);

	cmd.run(client, msg, args);
};

//flag

//0 - user

//1 - admin tier 0

//2 - admin tier 1