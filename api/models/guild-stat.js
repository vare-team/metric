import { DataTypes, Model } from 'sequelize';
import toSnakeCase from '../utils/to-snake-case.js';

export default class GuildStat extends Model {
	static initialize(sequelize) {
		GuildStat.init(
			{
				guildId: { type: DataTypes.STRING },
				date: { type: DataTypes.DATEONLY, primaryKey: true },

				viewed: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false },
				about: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false },
				joined: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false },
			},
			{
				sequelize,
				modelName: this.name,
				tableName: toSnakeCase(`${this.name}s`),
			}
		);
	}
}
