"use strict";

module.exports = (app) => {
	return async function checkToken(ctx, next) {
		const token = ctx.header.authorization;
		if (token) {
			const result = app.jwt.decode(token.substring(7));
			await next();
		} else {
			throw new Error("token is null");
		}
	};
};
