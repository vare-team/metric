module.exports = (client, guild, member) => {

  client.userLib.db.query('INSERT INTO statistic (id, date, banned, members) VALUES (?, ?, 1, ?) ON DUPLICATE KEY UPDATE banned = banned + 1, members = ?', [guild.id, new Date, guild.memberCount, guild.memberCount]);

};