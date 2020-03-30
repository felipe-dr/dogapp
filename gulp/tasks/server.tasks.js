/* ------------------------------------------------------------------------------------------ */
/* SERVER TASKS */
/* ------------------------------------------------------------------------------------------ */

/* REQUIRE'S */
/* ------------------------------------------------------------------------------------------ */
const config  = require('./../config')
const display = require('./display.log.tasks')


/* TASK FUNCTIONS */
/* ------------------------------------------------------------------------------------------ */
function serverTasks() {
	display.displayLogTasks(
		'', 
	    '', 
		config.env.development() ? 'development' : 'production', 
		'server: browser sync',
		'server'
	)
	
	// SERVER_STATIC
	config.plugins.browser_sync.init({
		server: {
			baseDir: config.folders.output.env,
			middleware: [config.plugins.compression()],
		}
	})

	// SERVER_DINAMIC
	// config.plugins.connect_php.server({
	// 	base: config.folders.output.env,
	// 	port: 1721,
	// 	keepalive: true
	// }, () => {
	// 	config.plugins.browser_sync({
	// 		proxy: '127.0.0.1:1721',
	// 		baseDir: config.folders.output.env,
	// 		open: true,
	// 		notify: true,
	// 	})
	// })
}


module.exports = { serverTasks }