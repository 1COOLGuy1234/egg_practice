"use strict";

module.exports = () => {
	return async function errorHandler(ctx, next) {
		try {
			await next();
		} catch (err) {
			ctx.app.emit("error", err, ctx);
			ctx.status = err.status;
			ctx.body = {
				msg: "fail",
				data: err.message,
			};
		}
	};
};
