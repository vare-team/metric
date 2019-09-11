const { registerFont, createCanvas, loadImage, Image } = require('canvas')
registerFont('./DINPro.ttf', { family: 'Comic Sans' })

let lines = {width: 530, height: 329, x: 35, y: 367, xoff: 52, yoff: 32};

lines.ycalc = (number, coff, min) => {return lines.y - ((number - min) * lines.yoff + (number - min)) / coff};

exports.help = {
  tier: 0,
  cooldown: 5000,
  args: 1
}

exports.run = async (client, msg, args) => {

  let buffertext;

  args[0] = args[0].toLowerCase();

  if (['added', 'removed', 'ups', 'guilds'].indexOf(args[0]) == -1) {
		msg.reply(`Введен неправильный тип. Список доступных типов: **added**, **removed**, **ups**, **guilds**`);
		return;
	}

	msg.channel.startTyping();

	switch (args[0]) {
		case "added":
			buffertext = "Новых серверов на сайте";
			break;
		case "removed":
			buffertext = "Ушедших серверов";
			break;
		case "guilds":
			buffertext = "Всего серверов";
			break;
		case "ups":
			buffertext = "Всего Апов";
			break;
	}
	
	let days = new Date();
	days.setHours(0, 0, 0);
	days.setDate(days.getDate() - 11);

	let count = await client.userLib.promise(client.userLib.db, client.userLib.db.queryKeyValue, 'SELECT date, ?? FROM sdcstat WHERE date > ?', [args[0], days]);
	count = count.res;

	let countSort = {};
	
	days.setDate(days.getDate() + 1);
	
	for (var i = 0; i < 11; i++) {
	  let flag = 1, sort = 0;
	  for (var j = 0, length = Object.keys(count).length; j < length; j++) {
	    if (days.getDate() == new Date(Object.keys(count)[j]).getDate()) {flag = 0; sort = count[Object.keys(count)[j]]}
	  }
	  countSort[('00' + days.getDate()).slice(-2) + '.' + ('00' + (days.getMonth() + 1)).slice(-2)] = flag ? 0 : sort;
	  days.setDate(days.getDate() + 1);
	}
	
	let rez = {max: Math.max.apply(null, Object.values(countSort)),min: Math.min.apply(null, Object.values(countSort))};
	rez.avg = (rez.max + rez.min)/Object.keys(countSort).length;
	rez.step = (rez.max - rez.min) / 10;

	rez.coff = ((rez.max - rez.min) * lines.yoff + (rez.max - rez.min)) / lines.height;

	const canvas = createCanvas(600, 400);
	const ctx = canvas.getContext('2d');

	ctx.drawImage(await loadImage('./sdctable.png'), 0, 0, 600, 400); //Задний фон

	ctx.strokeStyle = '#FFFFFF';
	ctx.fillStyle = '#FFFFFF';
	ctx.lineWidth = 2;

	ctx.beginPath();
	ctx.lineTo(lines.x, lines.ycalc(countSort[Object.keys(countSort)[0]], rez.coff, rez.min));

	for (var i = 1, length = Object.keys(countSort).length; i < length; i++) { //Линии
		ctx.lineTo(lines.x + i * lines.xoff + i, lines.ycalc(countSort[Object.keys(countSort)[i]], rez.coff, rez.min));
	}

	ctx.stroke();

	ctx.beginPath();
	ctx.arc(lines.x, lines.ycalc(countSort[Object.keys(countSort)[0]], rez.coff, rez.min), 4, 0, 2 * Math.PI);
	ctx.fill();

	for (var i = 1, length = Object.keys(countSort).length; i < length; i++) { //Кружки
		ctx.beginPath();
		ctx.arc(lines.x + i * lines.xoff + i, lines.ycalc(countSort[Object.keys(countSort)[i]], rez.coff, rez.min), 4, 0, 2 * Math.PI);
		ctx.fill();
	}

	ctx.font = '8px DinPro';
	ctx.fillStyle = '#FFFFFF';

	for (var i = 0; i < 11; i++) { // Текст
		ctx.fillText(Math.round((rez.step*i + rez.min)*10)/10, 22 - ctx.measureText(Math.round((rez.step*i + rez.min)*10)/10).width, lines.y - lines.yoff * i - i - 2); //Шаги
		ctx.fillText(Object.keys(countSort)[i], lines.x + i * lines.xoff + i - ctx.measureText(Object.keys(countSort)[i]).width / 2, 395); //Даты
	}

	let x = 19;
  do {
    ctx.font = `${x -= 1}px DinPro`;
  } while (ctx.measureText(buffertext).width > 545);
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(buffertext, canvas.width / 2 - (ctx.measureText(buffertext).width / 2), 23);

	let attachment = canvas.toBuffer();

	msg.channel.send({ files: [{ attachment, name: `sdcstat.png` }] });
	msg.channel.stopTyping();
};	