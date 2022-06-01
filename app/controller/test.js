"use strict";

const Controller = require("egg").Controller;

class TestController extends Controller {
	async readUser() {
		const { ctx } = this;
		const queryName = ctx.query.name;

		// const query = {
		// 	where: {
		// 		name: queryName,
		// 	},
		// };
		// const users = await ctx.model.User.findAll(query);

		const users = await ctx.model.User.findByPk(1);

		ctx.body = {
			code: 200,
			data: users,
			msg: "query success",
		};
	}

	async createUser() {
		const { ctx } = this;
		const { name, password, age, job } = ctx.request.body;
		const res = await ctx.model.User.create({ name, password, age, job });

		ctx.body = {
			code: ctx.status,
			data: res,
			msg: "insert successfully",
		};
	}
}

module.exports = TestController;
