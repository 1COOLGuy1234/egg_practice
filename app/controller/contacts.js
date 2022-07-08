"use strict";

const user = require("../model/user");

const Controller = require("egg").Controller;

function isTokenExpired(app, ctx) {
	const dataInToken = app.jwt.decode(ctx.header.authorization.substring(7));
	const isTokenExpired = dataInToken["expireTime"] < Date.now();
	return isTokenExpired ? true : false;
}

function toInt(str) {
	if (typeof str === "number") return str;
	if (!str) return str;
	return parseInt(str, 10) || 0;
}

class ContactController extends Controller {
	async index() {
		// get
		const { ctx, app } = this;

		const expired = isTokenExpired(app, ctx);

		if (expired) {
			ctx.body = {
				code: 403,
				msg: "token has expired",
			};
			return;
		}
		const dataInToken = app.jwt.decode(
			ctx.header.authorization.substring(7)
		);
		const userName = dataInToken["name"];
		const users = await ctx.service.contacts.getContactsByName(userName);
		ctx.body = {
			code: 200,
			data: users,
			msg: "query success",
		};
	}

	async getPagingContacts() {
		// paging
		const { ctx, app } = this;
		const expired = isTokenExpired(app, ctx);
		if (expired) {
			ctx.body = {
				code: 403,
				msg: "token has expired",
			};
			return;
		}
		const dataInToken = app.jwt.decode(
			ctx.header.authorization.substring(7)
		);
		const userName = dataInToken["name"];
		const capacity = toInt(ctx.query.capacity);
		const pageIndex = toInt(ctx.query.pindex);
		const users = await ctx.service.contacts.getPagingContactsByName(
			userName,
			pageIndex,
			capacity
		);
		ctx.body = {
			code: 200,
			data: users,
			msg: "query success",
		};
	}

	async getPageNumber() {
		const { ctx, app } = this;
		const expired = isTokenExpired(app, ctx);
		if (expired) {
			ctx.body = {
				code: 403,
				msg: "token has expired",
			};
			return;
		}
		const dataInToken = app.jwt.decode(
			ctx.header.authorization.substring(7)
		);
		const userName = dataInToken["name"];
		const capacity = ctx.query.capacity;
		const pageNumber = await ctx.service.contacts.getPageNumber(
			userName,
			capacity
		);
		ctx.body = {
			code: 200,
			data: Math.ceil(pageNumber),
			msg: "query success",
		};
	}

	async create() {
		// post
		const { ctx, app } = this;
		const { name, number } = ctx.request.body;
		const expired = isTokenExpired(app, ctx);
		if (expired) {
			ctx.body = {
				code: 403,
				msg: "token has expired",
			};
			return;
		}

		console.log("token valid");

		const dataInToken = app.jwt.decode(
			ctx.header.authorization.substring(7)
		);
		const ownerName = dataInToken["name"];

		const res = await ctx.service.contacts.insertContact(
			name,
			number,
			ownerName
		);
		ctx.body = {
			code: 200,
			data: res,
			msg: "insert success",
		};
	}

	async update() {
		// put
		// find target according name, update the number
		// if name doesn't exist, return false
		const { ctx, app } = this;

		const id = toInt(ctx.params.id);

		const expired = isTokenExpired(app, ctx);
		if (expired) {
			ctx.body = {
				code: 403,
				msg: "token has expired",
			};
			return;
		}

		const { name, number } = ctx.request.body;
		const target = await ctx.service.contacts.updateContact(
			id,
			name,
			number
		);
		if (target) {
			ctx.body = {
				code: 200,
				data: target,
				msg: "update success",
			};
		} else {
			ctx.body = {
				code: 404,
				msg: "update failed",
			};
		}
	}

	async destroy() {
		// delete
		const { ctx, app } = this;
		const id = toInt(ctx.params.id);
		const expired = isTokenExpired(app, ctx);
		if (expired) {
			ctx.body = {
				code: 403,
				msg: "token has expired",
			};
			return;
		}

		const target = await ctx.model.Contact.findByPk(id);
		if (!target) {
			ctx.status = 404;
			ctx.body = {
				code: ctx.status,
				msg: "delete failed",
			};
			return;
		}
		await target.destroy();
		ctx.body = {
			code: 200,
			msg: "delete success!",
		};
	}
}

module.exports = ContactController;
