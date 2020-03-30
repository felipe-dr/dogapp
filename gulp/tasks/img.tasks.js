/* ------------------------------------------------------------------------------------------ */
/* IMG TASKS */
/* ------------------------------------------------------------------------------------------ */

/* REQUIRE'S */
/* ------------------------------------------------------------------------------------------ */
const config  = require('./../config')
const display = require('./display.log.tasks')


/* TASK FUNCTIONS */
/* ------------------------------------------------------------------------------------------ */
function imgTasks() {
	display.displayLogTasks('app', 'img', config.paths.img.input)
	
	return config.gulp.src(config.paths.img.input)
		.pipe(config.env.production(config.plugins.image({
			svgo: ['--disable', 'removeTitle']
		})))
		.pipe(config.gulp.dest(config.paths.img.output))
}


module.exports = { imgTasks }