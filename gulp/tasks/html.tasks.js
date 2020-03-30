/* ------------------------------------------------------------------------------------------ */
/* HTML TASKS */
/* ------------------------------------------------------------------------------------------ */

/* REQUIRE'S */
/* ------------------------------------------------------------------------------------------ */
const config  = require('./../config')
const display = require('./display.log.tasks')


/* TASK FUNCTIONS */
/* ------------------------------------------------------------------------------------------ */
function htmlTasks() {
	display.displayLogTasks('app', 'html', config.paths.html.all.input)
	
	const firstPath = config.gulp.src(config.paths.html.index.input)
		.pipe(config.plugins.inject_partials())
		.pipe(config.plugins.bytediff.start())
		.pipe(config.env.production(config.plugins.html_clean({
			protect: [/<\!-- inject:.* -->/g,
                      /<\!-- endinject -->/g,
                      /<\!-- partial:.* -->/g,
                      /<\!-- partial -->/g]
		})))
		.pipe(config.plugins.bytediff.stop())
		.pipe(config.gulp.dest(config.paths.html.index.output))
	
	const secondPath = config.gulp.src(config.paths.html.pages.input)
		.pipe(config.plugins.inject_partials())
		.pipe(config.plugins.bytediff.start())
		.pipe(config.env.production(config.plugins.html_clean({
			protect: [/<\!-- inject:.* -->/g,
                      /<\!-- endinject -->/g,
                      /<\!-- partial:.* -->/g,
                      /<\!-- partial -->/g]
		})))
		.pipe(config.plugins.bytediff.stop())
		.pipe(config.gulp.dest(config.paths.html.pages.output))

	return config.plugins.merge_stream(firstPath, secondPath)
}

function htmlHint() {
	display.displayLogTasks('report', 'html_lint', config.paths.html.all.input)
		
	return config.gulp.src(config.paths.html.all.input)
		.pipe(config.plugins.html_hint())
		.pipe(config.plugins.html_hint.reporter('htmlhint-stylish'))
		.pipe(config.plugins.html_w3c())
}


module.exports = { htmlTasks, htmlHint }