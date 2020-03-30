/* ------------------------------------------------------------------------------------------ */
/* APP TASKS */
/* ------------------------------------------------------------------------------------------ */

/* REQUIRE'S */
/* ------------------------------------------------------------------------------------------ */
const config  = require('./../config')
const display = require('./display.log.tasks')


/* TASK FUNCTIONS */
/* ------------------------------------------------------------------------------------------ */
function appTasks() {
	display.displayLogTasks('app', 'app', config.paths.app.input)
	
	return config.gulp.src(config.paths.app.input)
		.pipe(config.plugins.bytediff.start())
		.pipe(config.plugins.bytediff.stop())
		.pipe(config.gulp.dest(config.paths.app.output))
}


module.exports = { appTasks }