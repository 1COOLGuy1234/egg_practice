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

// md5

class UserController extends Controller {
	async login() {
		// post
		const { ctx, app } = this;
		// console.log(ctx.request)
		const userName = ctx.request.body.name;
		const passWord = ctx.request.body.password;

		// check if username, password match
		const user = await ctx.service.user.getUserByName(userName, passWord);

		if (user) {
			// generate token
			const token = app.jwt.sign(
				{
					name: user["name"],
					age: user["age"],
					job: user["job"],
					expireTime: Date.now() + 5 * 1000,
				},
				app.config.jwt.secret
			);
			ctx.body = {
				code: 200,
				data: token,
				msg: "login succeed",
			};
		} else {
			ctx.body = {
				code: 400,
				msg: "login failed",
			};
		}
	}

	async index() {
		const { ctx, app } = this;

		const result = app.jwt.decode(ctx.header.authorization.substring(7));

		ctx.body = {
			code: 201,
			data: result,
			msg: "Verified!",
		};
	}

	async getInfoByToken() {
		const { ctx, app } = this;
		console.log("token = " + ctx.header.authorization);
		const result = app.jwt.decode(ctx.header.authorization.substring(7));
		const isTokenExpired = result["expireTime"] < Date.now();

		ctx.body = {
			code: isTokenExpired ? 400 : 201,
			data: isTokenExpired ? {} : result,
			msg: isTokenExpired
				? "Token expired! query failed"
				: "query successfully",
		};
	}

	async create() {
		// post
		const { ctx } = this;
		const { name, password, age, job } = ctx.request.body;
		const passwordEncrypted = ctx.helper.getMd5Data(password);
		console.log(passwordEncrypted);
		const res = await ctx.model.User.create({
			name,
			password: passwordEncrypted,
			age,
			job,
		});

		ctx.status = 200;
		ctx.body = {
			code: ctx.status,
			data: res,
			msg: "insert success",
		};
	}

	async delete() {
		// delete
		const { ctx } = this;
		ctx.to;
	}
}

module.exports = UserController;
