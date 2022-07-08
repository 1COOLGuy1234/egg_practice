"use strict";

const user = require("../model/user");

const Service = require("egg").Service;

class ContactService extends Service {
	async getContactsByName(username) {
		const { ctx } = this;

		const query = {
			where: {
				ownerName: username,
			},
		};

		const users = await ctx.model.Contact.findAll(query);
		return users;
	}

	async getPagingContactsByName(userName, pageIndex, capacity) {
		const { ctx } = this;
		const query = {
			where: {
				ownerName: userName,
			},
			limit: capacity,
			offset: (pageIndex - 1) * capacity,
		};

		const users = await ctx.model.Contact.findAll(query);
		return users;
	}

	async getPageNumber(userName, capacity) {
		const { ctx } = this;
		const query = {
			where: {
				ownerName: userName,
			},
		};
		const itemsNumber = await ctx.model.Contact.count(query);
		const pageNumber = itemsNumber / capacity;
		return pageNumber;
	}

	async insertContact(name, number, ownerName) {
		const { ctx } = this;

		const res = await ctx.model.Contact.create({
			name: name,
			phoneNumber: number,
			ownerName: ownerName,
		});

		return res;
	}

	async updateContact(id, name, number) {
		const { ctx } = this;

		const target = await ctx.model.Contact.findByPk(id);
		if (!target) {
			ctx.status = 404;
			return;
		}
		await target.update({
			name: name,
			phoneNumber: number,
		});
		return target;
	}
}
module.exports = ContactService;
