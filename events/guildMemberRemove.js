module.exports = (client, member) => {

  if (member.user.bot) return;

  client.userLib.db.query('INSERT INTO statistic (id, date, leaved, members) VALUES (?, ?, 1, ?) ON DUPLICATE KEY UPDATE leaved = leaved + 1, members = ?', [member.guild.id, new Date, member.guild.memberCount, member.guild.memberCount]);

};