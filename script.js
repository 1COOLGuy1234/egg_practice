import fetch from "node-fetch";

const insertFakeItems = async () => {
	// check tokene
	const token =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiWmhvdSIsImFnZSI6MjMsImpvYiI6ImludGVybiIsImV4cGlyZVRpbWUiOjE2NTQ4Mzk3NjQzNDgsImlhdCI6MTY1NDgzOTczNH0.FHwu_ioRfW-wQwYFMSQ3PlNE_V1lmC1bL-5JSHyBeSE";
	// request delete
	const rawResponse = await fetch("http://localhost:7001/contacts", {
		headers: {
			"Content-Type": "application/json",
			authorization: token,
		},
		method: "POST",
		body: JSON.stringify({
			name: "test",
			number: "011-123321",
		}),
	});

	const response = await rawResponse.json();

	// if token expired
	if (response.code === 403) {
		return;
	}
};

for (let i = 0; i < 1000; i++) {
	insertFakeItems().then(() => console.log(i));
}
