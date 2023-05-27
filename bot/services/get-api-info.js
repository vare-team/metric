import { request } from 'undici';

/**
 *
 * @param category {string}
 * @param date {Date}
 * @return {Promise<Record<string, number>>}
 */
export default async function (category, date) {
	const { body } = await request(`${process.env.API_URL}/${category}?days=${date.toISOString().split('T')[0]}`);
	return await body.json();
}
