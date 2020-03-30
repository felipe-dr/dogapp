/* ------------------------------------------------------------------------------------------ */
/* GULPFILE */
/* ------------------------------------------------------------------------------------------ */

/* REQUIRE'S */
/* ------------------------------------------------------------------------------------------ */
const config = require('./gulp/config')
const app    = require('./gulp/tasks/app.tasks')
const html   = require('./gulp/tasks/html.tasks')
const css    = require('./gulp/tasks/css.tasks')
const js     = require('./gulp/tasks/js.tasks')
const inject = require('./gulp/tasks/inject.tasks')
const img    = require('./gulp/tasks/img.tasks')
const del    = require('./gulp/tasks/del.tasks')
const server = require('./gulp/tasks/server.tasks')
const watch  = require('./gulp/tasks/watch.tasks')


/* LOAD OPTIONS */
/* ------------------------------------------------------------------------------------------ */
const cssTasks = config.options.css.taskType === 'all' ? css.cssAllTasks : [css.cssVendorsTasks, css.cssAppTasks]
const jsTasks  = config.options.js.taskType === 'all' ? js.jsAllTasks : [js.jsVendorsTasks, js.jsAppTasks]


/* ENVIRONMENT TASKS */
/* ------------------------------------------------------------------------------------------ */
function defaultDev() {
	module.exports.default = 
        config.gulp.series(del.delBuildTasks, del.delLogTasks, app.appTasks, html.htmlTasks, del.delHtmlTasks, cssTasks, jsTasks, inject.injectTasks, img.imgTasks, config.gulp.parallel(server.serverTasks, watch.watchTasks))
}

function defaultProd() {
	module.exports.default = 
        config.gulp.series(del.delBuildTasks, del.delLogTasks, app.appTasks, html.htmlTasks, del.delHtmlTasks, cssTasks, jsTasks, inject.injectTasks, img.imgTasks)
}

config.env.development() ? defaultDev() : defaultProd()