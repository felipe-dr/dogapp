/* ------------------------------------------------------------------------------------------ */
/* WATCH TASKS */
/* ------------------------------------------------------------------------------------------ */

/* REQUIRE'S */
/* ------------------------------------------------------------------------------------------ */
const config = require('./../config')
const app    = require('./app.tasks')
const html   = require('./html.tasks')
const css    = require('./css.tasks')
const js     = require('./js.tasks')
const inject = require('./inject.tasks')
const img    = require('./img.tasks')
const del    = require('./del.tasks')
const server = require('./server.tasks')
const watch  = require('./watch.tasks')


/* LOAD OPTIONS */
/* ------------------------------------------------------------------------------------------ */
const cssTasks  = config.options.css.taskType === 'all' ? css.cssAllTasks : [css.cssVendorsTasks, css.cssAppTasks]
const jsTasks   = config.options.js.taskType === 'all' ? js.jsAllTasks : [js.jsVendorsTasks, js.jsAppTasks]


/* TASK FUNCTIONS */
/* ------------------------------------------------------------------------------------------ */
function watchTasks() {
	// APP
	config.gulp.watch(config.paths.app.input).on('change', config.gulp.series(app.appTasks, config.plugins.browser_sync.reload))
	
	// HTML
	config.gulp.watch(config.paths.html.all.input).on('change', config.gulp.series(html.htmlTasks, del.delHtmlTasks, inject.injectTasks, html.htmlHint, config.plugins.browser_sync.reload))
	
	// CSS
	config.gulp.watch(config.paths.style.all.input).on('change', config.gulp.series(cssTasks, css.cssLint, config.plugins.browser_sync.reload))
	
	// JS
	config.gulp.watch(config.paths.js.all.input).on('change', config.gulp.series(jsTasks, js.jsHint, config.plugins.browser_sync.reload))
	
	// IMG
	config.gulp.watch(config.paths.img.input, img.imgTasks)
}


module.exports = { watchTasks }