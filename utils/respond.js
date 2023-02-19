import generateAttachment from './generate-attachment.js';
import invalidCategory from './invalid-category.js';
import { AttachmentBuilder } from 'discord.js';

export default async function (interaction, text, category) {
	const image = await generateAttachment(text, category).catch(invalidCategory(interaction));

	if (!image) return;

	await interaction.editReply({
		files: [new AttachmentBuilder(image, { name: `sdcstat.png` })],
		ephemeral: false,
	});
}
