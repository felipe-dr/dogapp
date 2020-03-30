/* ------------------------------------------------------------------------------------------ */
/* CSS TASKS */
/* ------------------------------------------------------------------------------------------ */

/* REQUIRE'S */
/* ------------------------------------------------------------------------------------------ */
const config  = require('./../config')
const display = require('./display.log.tasks')


/* TASK FUNCTIONS */
/* ------------------------------------------------------------------------------------------ */
function cssVendorsTasks() {
	display.displayLogTasks('vendors', 'css', config.paths.style.vendors.input)
	
	return config.gulp.src(config.paths.style.vendors.input)
		.pipe(config.plugins.sass_compile())
		.pipe(config.plugins.concat(`${config.options.css.fileNames.vendors}.css`))
		.pipe(config.plugins.bytediff.start())
		.pipe(config.plugins.css_autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(config.plugins.css_purge({
			content: [config.paths.html.index.input, config.paths.html.pages.input],
			whitelistPatterns: [/c-status/]
		}))
		.pipe(config.env.production(config.plugins.css_clean()))
		.pipe(config.env.production(config.plugins.rename(`${config.options.css.fileNames.vendors}.min.css`)))
		.pipe(config.plugins.bytediff.stop())
		.pipe(config.gulp.dest(config.paths.style.vendors.output))
}

function cssAppTasks() {
	display.displayLogTasks('app', 'css', config.paths.style.app.input)
	
	return config.gulp.src(config.paths.style.app.input)
		.pipe(config.plugins.sass_compile())
		.pipe(config.plugins.concat(`${config.options.css.fileNames.app}.css`))
		.pipe(config.plugins.bytediff.start())
		.pipe(config.plugins.css_autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(config.plugins.css_purge({
			content: [config.paths.html.index.input, config.paths.html.pages.input],
			whitelistPatterns: [/is-/]
		}))
		.pipe(config.env.production(config.plugins.css_clean()))
		.pipe(config.env.production(config.plugins.rename(`${config.options.css.fileNames.app}.min.css`)))
		.pipe(config.plugins.bytediff.stop())
		.pipe(config.gulp.dest(config.paths.style.app.output))
}

function cssAllTasks() {
	display.displayLogTasks('all', 'css', config.paths.style.all.input)
	
	return config.gulp.src(config.paths.style.all.input)
		.pipe(config.plugins.sass_compile())
		.pipe(config.plugins.concat(`${config.options.css.fileNames.all}.css`))
		.pipe(config.plugins.bytediff.start())
		.pipe(config.plugins.css_autoprefixer({
       		browsers: ['last 2 versions'],
       		cascade: false
       	}))
		.pipe(config.plugins.css_purge({
       		content: [config.paths.html.index.input, config.paths.html.pages.input],
       		whitelistPatterns: [/c-status/]
       	}))
		.pipe(config.env.production(config.plugins.css_clean()))
		.pipe(config.env.production(config.plugins.rename(`${config.options.css.fileNames.all}.min.css`)))
		.pipe(config.plugins.bytediff.stop())
		.pipe(config.gulp.dest(config.paths.style.all.output))
}

function cssLint() {
	display.displayLogTasks('report', 'css_lint', config.paths.style.log.input)
	
	config.plugins.css_lint.addFormatter('csslint-stylish')

	return config.gulp.src(config.paths.style.log.input)
		.pipe(config.plugins.css_lint({
			'shorthand': true
		}))
		//.pipe(config.plugins.css_lint.formatter('stylish'))
	    .pipe(config.plugins.css_lint_report({
		    'directory': config.paths.style.log.output,
		    'filename': 'index.html'
		}))
}


module.exports = { cssVendorsTasks, cssAppTasks, cssAllTasks, cssLint }