"use strict";

const Service = require("egg").Service;

function toInt(str) {
	if (typeof str === "number") return str;
	if (!str) return str;
	return parseInt(str, 10) || 0;
}

class UserService extends Service {
	// query user by username && password, if none, return null
	async getUserByName(username, password) {
		const { ctx } = this;
		const data = await this.getUser();
		const passwordEncrypted = ctx.helper.getMd5Data(password);
		for (const item of data) {
			// traverse whole list
			if (
				item["name"] === username &&
				item["password"] === passwordEncrypted
			) {
				return item;
			}
		}
		return null;
	}
	// 获取用户，不传id则查询所有
	async getUser(id) {
		const { ctx } = this;
		const query = {
			limit: toInt(ctx.query.limit),
			offset: toInt(ctx.query.offset),
		};
		// return await ctx.model.User.findByPk(1);

		if (id) {
			return await ctx.model.User.findByPk(toInt(id));
		}
		return await ctx.model.User.findAll(query);
	}
}
module.exports = UserService;
