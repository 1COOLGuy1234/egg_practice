"use strict";

module.exports = () => {
	return async function errorHandler(ctx, next) {
		try {
			await next();
		} catch (err) {
			// 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
			ctx.app.emit("error", err, ctx);
			ctx.status = err.status || 500;
			if (ctx.status !== 500) {
				ctx.body = {
					code: ctx.status,
					msg: err.message,
				};
			} else {
				ctx.body = {
					code: 500,
					msg: "no message",
				};
			}
		}
	};
};
