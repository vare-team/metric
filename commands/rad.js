const { registerFont, createCanvas, loadImage, Image } = require('canvas')
registerFont('./DINPro.ttf', { family: 'Comic Sans' })

let lines = {width: 530, height: 329, x: 35, y: 367, xoff: 52, yoff: 32};

lines.ycalc = (number, coff, min) => {return lines.y - ((number - min) * lines.yoff + (number - min)) / coff};

exports.help = {
  tier: 0,
  cooldown: 5000,
  args: 0
}

exports.run = async (client, msg, args) => {

	msg.channel.startTyping();
	
	let count = await client.userLib.promise(client.userLib.db, client.userLib.db.queryRow, 'SELECT SUM(joined) AS joined, SUM(leaved) AS leaved FROM statistic WHERE id = ?', [msg.guild.id]);
	count = count.res;

	const canvas = createCanvas(600, 400);
	const ctx = canvas.getContext('2d');

	ctx.drawImage(await loadImage(msg.guild.iconURL), 567, 4, 30, 30); //ава гильдии
	ctx.drawImage(await loadImage('./diagram.png'), 0, 0, 600, 400); //Задний фон

	let diagram = +count.joined + +count.leaved;

	ctx.fillStyle = '#43B581';

	ctx.beginPath();
	ctx.lineTo(200, 200);
	ctx.arc(200, 200, 150, 0, ((count.joined/diagram*360)*Math.PI)/180);
	ctx.fill();

	ctx.fillStyle = '#F04747';

	ctx.beginPath();
	ctx.lineTo(200, 200);
	ctx.arc(200, 200, 150, ((count.joined/diagram*360)*Math.PI)/180, 0);
	ctx.fill();

	ctx.fillStyle = '#282B30';

	ctx.beginPath();
	ctx.arc(200, 200, 70, 0, 2*Math.PI);
	ctx.fill();

	ctx.font = '18px DinPro';

	const applyText = (text, x, y, fontSize, width, flag = false) => {
    while (ctx.measureText(text).width > width) {
        ctx.font = `${fontSize -= 1}px DinPro`;
    }
    if (flag) x = canvas.width / 2 - (ctx.measureText(text).width / 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(text, x, y);
	};

	applyText(`Покинуло/Присоединилось "${msg.guild.name}"`, 300, 23, 18, 545, true);//Лейбл

	applyText(`${count.leaved} | ${Math.round(count.leaved/diagram*100)}%`, 410, 180, 18, 187);
	applyText(`${count.joined} | ${Math.round(count.joined/diagram*100)}%`, 410, 234, 18, 187);

	let attachment = canvas.toBuffer();

	msg.channel.send({ files: [{ attachment, name: `stat.png` }] });
	msg.channel.stopTyping();

};	