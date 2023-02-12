export default class CategoryEnum {
	categories = categoriesArray;

	/**
	 *
	 * @param name {string}
	 * @return {boolean}
	 */
	static validate(name) {
		return categoriesArray.has(name);
	}

	/**
	 * @return {string}
	 */
	static categoriesListString() {
		return categoriesArray.toString();
	}
}

const categoriesArray = [
	'added',
	'removed',
	'guilds',
	'ups',
];
