const fse = require("fs-extra");
const path = require("path");
const removeDirs = [
	'../app',
	'../../plugin/minialipay',
	'../../plugin/wxa',
	'../../plugin/core'
];

(async () => {
	for (let row of removeDirs) {
		const filePath = path.resolve(__dirname, row);
		const exist = await fse.pathExists(filePath);
		console.log(`path ${filePath} exist ${exist}`);
		if (exist) {
			try {
				await fse.remove(filePath)
				console.log(`remove ${filePath} success!`)
			} catch (err) {
				console.error(err)
			}
		}
	}

	// 执行upgrateEnvToYml
	require("bin/upgrateEnvToYml.js");

	// 生成install.lock
	await fse.ensureFile("install.lock");
})()

