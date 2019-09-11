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

  let stroke, fill, buffertext;

  args[0] = args[0].toLowerCase();

  if (['msg', 'joined', 'leaved', 'members', 'banned'].indexOf(args[0]) == -1) {
		msg.reply(`Введен неправильный тип. Список доступных типов: **msg**, **joined**, **leaved**, **members**, **banned**`);
		return;
	}

	msg.channel.startTyping();

	switch (args[0]) {
		case "msg":
			buffertext = "Кол-во сообщений на сервере";
			stroke = "#4E5D94";fill = "#7289DA";
			break;
		case "joined":
			buffertext = "Кол-во новых участников сервера";
			stroke = "#3DA677";fill = "#43B581";
			break;
		case "leaved":
			buffertext = "Кол-во вышедших участников сервера";
			stroke = "#D84040";fill = "#F04747";
			break;
		case "members":
			buffertext = "Кол-во участников сервера";
			stroke = "#D89117";fill = "#FAA61A";
			break;
		case "banned":
			buffertext = "Кол-во банов на сервере";
			stroke = "#860111";fill = "#EC0304";
			break;
	}
	
	let days = new Date();
	days.setHours(0, 0, 0);
	days.setDate(days.getDate() - 11);

	let count = await client.userLib.promise(client.userLib.db, client.userLib.db.queryKeyValue, 'SELECT date, ?? FROM statistic WHERE id = ? AND date > ?', [args[0], msg.guild.id, days]);
	count = count.res;

	let countSort = {};
	
	days.setDate(days.getDate() + 1);
	
	for (var i = 0; i < 11; i++) {
	  let flag = 1, sort = 0;
	  for (var j = 0, length = Object.keys(count).length; j < length; j++){
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

	ctx.drawImage(await loadImage(msg.guild.iconURL), 567, 4, 30, 30); //ава гильдии
	ctx.drawImage(await loadImage('./table.png'), 0, 0, 600, 400); //Задний фон

	ctx.strokeStyle = stroke;
	ctx.fillStyle = fill;
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
	ctx.fillStyle = '#5E6064';

	for (var i = 0; i < 11; i++) { // Текст
		ctx.fillText(Math.round((rez.step*i + rez.min)*10)/10, 22 - ctx.measureText(Math.round((rez.step*i + rez.min)*10)/10).width, lines.y - lines.yoff * i - i - 2); //Шаги
		ctx.fillText(Object.keys(countSort)[i], lines.x + i * lines.xoff + i - ctx.measureText(Object.keys(countSort)[i]).width / 2, 395); //Даты
	}

	let x = 19;
  do {
    ctx.font = `${x -= 1}px DinPro`;
  } while (ctx.measureText(`${buffertext} "${msg.guild.name}"`).width > 545);
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(`${buffertext} "${msg.guild.name}"`, canvas.width / 2 - (ctx.measureText(`${buffertext} "${msg.guild.name}"`).width / 2), 23);

	let attachment = canvas.toBuffer();

	msg.channel.send({ files: [{ attachment, name: `stat.png` }] });
	msg.channel.stopTyping();
};	