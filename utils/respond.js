import generateAttachment from './generate-attachment.js';
import invalidCategory from './invalid-category.js';

export default async function(interaction, text, category) {
	const image = await generateAttachment(text, category).catch(invalidCategory(interaction));

	if (!image)
		return;

	await interaction.editReply({ files: [{ image, name: `sdcstat.png` }], ephemeral: false });
}
