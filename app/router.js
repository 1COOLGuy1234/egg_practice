"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
	app.beforeStart(async () => {
		await app.model.sync({ alter: true });
	});

	const error_handler = app.middleware.errorHandler();
	const check_token = app.middleware.checkToken(app);

	const { router, controller } = app;
	// router.resources("login", "/login", controller.user);
	// router.get("/readUser", controller.test.readUser);
	// router.post("/createUser", controller.test.createUser);

	router.post("/user/login", controller.user.login);
	router.post("/user", controller.user.index);
	router.post("/user/create", controller.user.create);
	router.get(
		"/user/getInfoByToken",
		error_handler,
		check_token,
		controller.user.getInfoByToken
	);
	router.get("/contacts/getPageNumber", controller.contacts.getPageNumber);
	router.get(
		"/contacts/getPagingContacts",
		controller.contacts.getPagingContacts
	);
	router.resources("contacts", "/contacts", controller.contacts);
	// router.post("/contacts/create", controller.contacts.create);
};
