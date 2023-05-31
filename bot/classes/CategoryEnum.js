export default class CategoryEnum {
	categories = categoriesArray;

	/**
	 *
	 * @param name {string}
	 * @return {boolean}
	 */
	static validate(name) {
		return categoriesArray.includes(name);
	}

	/**
	 * @return {string}
	 */
	static categoriesListString() {
		return categoriesArray.toString();
	}
}

const categoriesArray = ['sdc/added', 'sdc/removed', 'sdc/guilds', 'ups'];
export const categoriesDictionary = {
	added: categoriesArray[0],
	removed: categoriesArray[1],
	guilds: categoriesArray[2],
	ups: categoriesArray[3],
};
