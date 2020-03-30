/* ------------------------------------------------------------------------------------------ */
/* INJECT TASKS */
/* ------------------------------------------------------------------------------------------ */

/* REQUIRE'S */
/* ------------------------------------------------------------------------------------------ */
const config  = require('./../config')
const display = require('./display.log.tasks')


/* TASK FUNCTIONS */
/* ------------------------------------------------------------------------------------------ */
function injectTasks() {
	display.displayLogTasks('app', 'inject', config.paths.inject.html.all.input)
	
	const cssVendorsPath = config.gulp.src(config.paths.inject.style.vendors.input, { read: false })
	const cssAppPath     = config.gulp.src(config.paths.inject.style.app.input, { read: false })
	const cssAllPath     = config.gulp.src(config.paths.inject.style.all.input, { read: false })
	const jsVendorsPath  = config.gulp.src(config.paths.inject.js.vendors.input, { read: false })
	const jsAppPath      = config.gulp.src(config.paths.inject.js.app.input, { read: false })
	const jsAllPath      = config.gulp.src(config.paths.inject.js.all.input, { read: false })
	
	const firstPath = config.gulp.src(config.paths.inject.html.index.input)
		.pipe(config.plugins.inject(config.plugins.stream_series(
			cssVendorsPath, cssAppPath, cssAllPath, jsVendorsPath, jsAppPath, jsAllPath), { relative: true })
		)
		.pipe(config.env.production(config.plugins.html_clean()))
		.pipe(config.gulp.dest(config.paths.inject.html.index.output))
	
	const secondPath = config.gulp.src(config.paths.inject.html.pages.input)
		.pipe(config.plugins.inject(config.plugins.stream_series(
			cssVendorsPath, cssAppPath, cssAllPath, jsVendorsPath, jsAppPath, jsAllPath), { relative: true })
		)
		.pipe(config.env.production(config.plugins.html_clean()))
		.pipe(config.gulp.dest(config.paths.inject.html.pages.output))
	
	return config.plugins.merge_stream(firstPath, secondPath)
}


module.exports = { injectTasks }