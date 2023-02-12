import { CommandInteraction } from 'discord.js';
import CategoryEnum from '../classes/CategoryEnum.js';

/**
 *
 * @param interaction {CommandInteraction}
 * @return {(function(): Promise<*>)|*}
 */
export default function(interaction) {
	return async () => {
		await interaction.editReply('Введен неправильный тип. Список доступных типов:' + CategoryEnum.categoriesListString());
	};
}
