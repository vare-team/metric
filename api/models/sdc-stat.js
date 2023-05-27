import { DataTypes, Model } from 'sequelize';
import toSnakeCase from '../utils/to-snake-case.js';

export default class SdcStat extends Model {
	static initialize(sequelize) {
		SdcStat.init(
			{
				date: { type: DataTypes.DATEONLY, primaryKey: true },

				added: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false },
				removed: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false },
				guilds: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false },
				ups: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false },
			},
			{
				sequelize,
				modelName: this.name,
				tableName: toSnakeCase(`${this.name}s`),
			}
		);
	}

	static setupScopes(models) {
		this.addScope('webhook', () => ({ paranoid: false, include: { model: models.Guild, as: 'guild' } }));
	}
}
