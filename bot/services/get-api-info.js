import { request } from 'undici';

/**
 *
 * @param category {string}
 * @param days {number}
 * @return {Promise<Record<string, number>>}
 */
export default async function (category, days) {
	const { body } = await request(`${process.env.API_URL}/${category}?days=${days}`);
	return await body.json();
}
