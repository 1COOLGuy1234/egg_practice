"use strict";

const Controller = require("egg").Controller;

/**
 * User {
 *    userName
 *    passWord
 *    Age
 *    Job
 * }
 */

class UserController extends Controller {
	async index() {
		// get
		const { ctx } = this;
		const query = {
			where: {
				name: ctx.query.name,
			},
		};

		const users = await ctx.model.User.findAll(query);

		ctx.body = {
			code: 200,
			data: users,
			msg: "query success",
		};
	}

	async create() {
		// post
		const { ctx } = this;
		const { name, password, age, job } = ctx.request.body;
		const res = await ctx.model.User.create({ name, password, age, job });

		ctx.body = {
			code: ctx.status,
			data: res,
			msg: "insert success",
		};
	}

	async delete() {
		// delete
	}
}

module.exports = UserController;
