/* ------------------------------------------------------------------------------------------ */
/* JS TASKS */
/* ------------------------------------------------------------------------------------------ */

/* REQUIRE'S */
/* ------------------------------------------------------------------------------------------ */
const config  = require('./../config')
const display = require('./display.log.tasks')


/* TASK FUNCTIONS */
/* ------------------------------------------------------------------------------------------ */
function jsVendorsTasks() {
	display.displayLogTasks('vendors', 'js', config.paths.js.vendors.input)
	
	return config.gulp.src(config.paths.js.vendors.input)
		.pipe(config.plugins.concat(`${config.options.js.fileNames.vendors}.js`))
		.pipe(config.plugins.bytediff.start())
		.pipe(config.env.production(config.plugins.js_uglify()))
		.pipe(config.env.production(config.plugins.rename(`${config.options.js.fileNames.vendors}.min.js`)))
		.pipe(config.plugins.bytediff.stop())
		.pipe(config.gulp.dest(config.paths.js.vendors.output))
}

function jsAppTasks() {
	display.displayLogTasks('app', 'js', config.paths.js.app.input)
	
	return config.gulp.src(config.paths.js.app.input)
		.pipe(config.plugins.concat(`${config.options.js.fileNames.app}.js`))
		.pipe(config.plugins.bytediff.start())
		.pipe(config.env.production(config.plugins.js_uglify()))
		.pipe(config.env.production(config.plugins.rename(`${config.options.js.fileNames.app}.min.js`)))
		.pipe(config.plugins.bytediff.stop())
		.pipe(config.gulp.dest(config.paths.js.app.output))
}

function jsAllTasks() {
	display.displayLogTasks('all', 'js', config.paths.js.all.input)
	
	return config.gulp.src(config.paths.js.all.input)
	  // .pipe(config.plugins.concat(`${config.options.js.fileNames.all}.js`))
		.pipe(config.plugins.bytediff.start())
		.pipe(config.plugins.rollup({ plugins: [
			config.plugins.babel(),
			config.plugins.terser(),
			config.plugins.resolve(),
			config.plugins.commonjs(),
		] }, 'iife'))
		// .pipe(config.env.production(config.plugins.js_uglify()))
		.pipe(config.env.production(config.plugins.rename(`${config.options.js.fileNames.all}.min.js`)))
		.pipe(config.plugins.bytediff.stop())
		.pipe(config.gulp.dest(config.paths.js.all.output))
}

function jsHint() {
	display.displayLogTasks('report', 'js_hint', config.paths.js.all.input)
	
	return config.gulp.src(config.paths.js.all.input)
		.pipe(config.plugins.js_hint())
		.pipe(config.plugins.js_hint.reporter('jshint-stylish'))
		.pipe(config.plugins.js_hint.reporter('gulp-jshint-html-reporter', {
		    filename: config.paths.js.log.output + 'jshint.html'
	    }))
}


module.exports = { jsVendorsTasks, jsAppTasks, jsAllTasks, jsHint }