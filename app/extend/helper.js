const crypto = require("crypto");

module.exports = {
	getMd5Data(data) {
		return crypto.createHash("md5").update(data).digest("hex");
	},
};
