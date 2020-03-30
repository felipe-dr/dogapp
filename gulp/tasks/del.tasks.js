/* ------------------------------------------------------------------------------------------ */
/* DEL TASKS */
/* ------------------------------------------------------------------------------------------ */

/* REQUIRE'S */
/* ------------------------------------------------------------------------------------------ */
const config  = require('./../config')
const display = require('./display.log.tasks')


/* TASK FUNCTIONS */
/* ------------------------------------------------------------------------------------------ */
async function delBuildTasks() {
	display.displayLogTasks('app', 'del_build', config.paths.del.inputBuild)
	
	await config.plugins.del(config.paths.del.inputBuild)
}

async function delLogTasks() {
	display.displayLogTasks('app', 'del_log', config.paths.del.inputLog)
	
	await config.plugins.del(config.paths.del.inputLog)
}

async function delHtmlTasks() {
	display.displayLogTasks('app', 'del_html', config.paths.del.inputPartials)
	
	await config.plugins.del(config.paths.del.inputPartials)
}


module.exports = { delBuildTasks, delLogTasks, delHtmlTasks }