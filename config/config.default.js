/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
	/**
	 * built-in config
	 * @type {Egg.EggAppConfig}
	 **/
	const config = (exports = {});

	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + "_1653554953490_8945";

	// add your middleware config here
	config.middleware = [];

	// add your user config here
	const userConfig = {
		// myAppName: 'egg',
	};

	config.security = {
		csrf: {
			enable: false,
		},
		domainWhiteList: [],
	};

	// config.cors = {
	// 	origin: "http://127:0.0.1:3000",
	// 	allowMethods: "*",
	// };

	config.sequelize = {
		dialect: "mysql",
		host: "127.0.0.1",
		port: 3306,
		database: "LogIn",
		username: "root",
		password: "12345678",
	};

	config.jwt = {
		secret: "secret",
		ignore: ["/login"], // TODO: change the ingore here
	};

	return {
		...config,
		...userConfig,
	};
};
