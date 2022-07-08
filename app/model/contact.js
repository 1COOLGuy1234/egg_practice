"use strict";

module.exports = (app) => {
	const { STRING, INTEGER, DATE } = app.Sequelize;

	const Contact = app.model.define("contact", {
		id: { type: INTEGER, primaryKey: true, autoIncrement: true },
		name: STRING(30),
		phoneNumber: STRING(30),
		ownerName: STRING(30),
		created_at: DATE,
		updated_at: DATE,
	});

	return Contact;
};
