/* ------------------------------------------------------------------------------------------ */
/* CONFIG */
/* ------------------------------------------------------------------------------------------ */

/* GULP PLUGINS */
/* ------------------------------------------------------------------------------------------ */
const gulp                        = require('gulp')
const { development, production } = require('gulp-environments')
const browser_sync                = require('browser-sync')
const compression                 = require('compression')
const connect_php                 = require('gulp-connect-php')
const rename                      = require('gulp-rename')
const del                         = require('del')
const bytediff                    = require('gulp-bytediff')
const concat                      = require('gulp-concat')
const merge_stream                = require('merge-stream')
const stream_series               = require('stream-series')
const inject                      = require('gulp-inject')
const inject_partials             = require('gulp-inject-partials')
const html_clean                  = require('gulp-htmlclean')
const html_hint                   = require('gulp-htmlhint')
const html_w3c                    = require('gulp-w3c-html-validator')
const sass_compile                = require('gulp-sass')
const css_clean                   = require('gulp-clean-css')
const css_autoprefixer            = require('gulp-autoprefixer')
const css_purge                   = require('gulp-purgecss')
const css_lint                    = require('gulp-csslint')
const css_lint_report             = require('gulp-csslint-report')
const js_uglify                   = require('gulp-uglify')
const rollup                      = require('gulp-better-rollup');
const babel                       = require('rollup-plugin-babel');
const resolve                     = require('rollup-plugin-node-resolve');
const rollup_uglify               = require('rollup-plugin-uglify');
const { terser }               = require('rollup-plugin-terser');
const commonjs                    = require('rollup-plugin-commonjs');
const js_hint                     = require('gulp-jshint')
const image                       = require('gulp-image')

// VARS
const env = { development, production }

const plugins = {
	browser_sync, 
	compression, 
	connect_php, 
	rename, 
	del, 
	bytediff, 
	concat, 
	merge_stream, 
	stream_series, 
	inject,
	html_clean, 
	html_hint, 
	html_w3c, 
	inject_partials, 
	sass_compile, 
	css_clean, 
	css_autoprefixer, 
	css_purge, css_lint, 
	css_lint_report,
	js_uglify, js_hint,
	rollup,
	rollup_uglify,
	terser,
	babel,
	resolve,
	commonjs,
	image,
}


/* CONFIG OPTIONS */
/* ------------------------------------------------------------------------------------------ */
const options = {
	css: {
		taskType: 'all',
		fileNames: {
			vendors: 'vendors',
			app: 'app',
			all: 'style',
		},
	},
	
	js: {
		taskType: 'all',
		fileNames: {
			vendors: 'vendors',
			app: 'app',
			all: 'script',
		},
	},
}


/* CONFIG PATHS */
/* ------------------------------------------------------------------------------------------ */
const folders = {
	input: {
		src: 'src/',
		app: 'app/',
		static: 'public/',
		pages: 'pages/',
		assets: 'assets/',
		css: 'sass/',
		js: 'js/',
		img: 'img/',
	},
	
	output: {
		build: 'build/',
		env: null,
		app: 'app/',
		static: 'public/',
		pages: 'pages/',
		assets: 'assets/',
		css: 'css/',
		js: 'js/',
		img: 'img/',
	},
	
	gulp: {
		root: 'gulp/',
		log: {
			root: 'log/',
			cssLint: 'csslint/',
			jsHint: 'jshint/',
		},
	},
}

folders.output.env = development() ? folders.output.build + 'dev/' : folders.output.build + 'prod/'

const paths = {
	app: {
		input: folders.input.src + folders.input.app + '**/*.php',
		output: folders.output.env + folders.output.app,
	},
	
	html: {
		index: {
			input: folders.input.src + 'index.{html,php}',
			output: folders.output.env,
		},
		pages: {
			input: folders.input.src + folders.input.static + folders.input.pages + '**/*.{html,php}',
			output: folders.output.env + folders.output.static + folders.output.pages,
		},
		all: {
			input: [folders.input.src + 'index.{html,php}',
					folders.input.src + folders.input.static + folders.input.pages + '**/*.{html,php}'],
		},
	},
	
	style: {
		vendors: {
			input: folders.input.src + folders.input.static + folders.input.assets + folders.input.css + 'mainVendors.scss',
			output: folders.output.env + folders.output.static + folders.output.assets + folders.output.css,
		},
		app: {
			input: folders.input.src + folders.input.static + folders.input.assets + folders.input.css + 'mainApp.scss',
			output: folders.output.env + folders.output.static + folders.output.assets + folders.output.css,
		},
		all: {
			input: folders.input.src + folders.input.static + folders.input.assets + folders.input.css + '**/*.{scss,sass,css}',
			output: folders.output.env + folders.output.static + folders.output.assets + folders.output.css,
		},
		log: {
			input: folders.output.env + folders.output.static + folders.output.assets + folders.output.css + '**/*.css',
			output: folders.gulp.root + folders.gulp.log.root + folders.gulp.log.cssLint,
		},
	},
	
	js: {
		vendors: {
			input: [folders.input.src + folders.input.static + folders.input.assets + folders.input.js + '1_vendors/libs/**/*.js',
					folders.input.src + folders.input.static + folders.input.assets + folders.input.js + '1_vendors/plugins/**/*.js'],
			output: folders.output.env + folders.output.static + folders.output.assets + folders.output.js,
		},
		app: {
			input: folders.input.src + folders.input.static + folders.input.assets + folders.input.js + '2_components/**/*.js',
			output: folders.output.env + folders.output.static + folders.output.assets + folders.output.js,
		},
		all: {
			// input: [folders.input.src + folders.input.static + folders.input.assets + folders.input.js + '1_vendors/libs/**/*.js',
			// 		folders.input.src + folders.input.static + folders.input.assets + folders.input.js + '1_vendors/plugins/**/*.js',
			// 		folders.input.src + folders.input.static + folders.input.assets + folders.input.js + '**/*.js'],
			input: folders.input.src + folders.input.static + folders.input.assets + folders.input.js + 'script.js',
			output: folders.output.env + folders.output.static + folders.output.assets + folders.output.js,
		},
		log: {
			output: folders.gulp.root + folders.gulp.log.root + folders.gulp.log.jsHint,
		},
	},
	
	inject: {
		html: {
			index: {
				input: folders.output.env + 'index.{html,php}',
				output: folders.output.env,
			},
			pages: {
				input: folders.output.env + folders.output.static + folders.output.pages + '**/*.{html,php}',
				output: folders.output.env + folders.output.static + folders.output.pages,
			},
			all: {
				input: [folders.output.env + 'index.{html,php}',
						folders.output.env + folders.output.static + folders.output.pages + '**/*.{html,php}'],
			}
		},
		
		style: {
			vendors: {
				input: folders.output.env + folders.output.static + folders.output.assets + folders.output.css + options.css.fileNames.vendors + '*.css',
			},
			app: {
				input: folders.output.env + folders.output.static + folders.output.assets + folders.output.css + options.css.fileNames.app + '*.css',
			},
			all: {
				input: folders.output.env + folders.output.static + folders.output.assets + folders.output.css + options.css.fileNames.all + '*.css',
			},
		},
		
		js: {
			vendors: {
				input: folders.output.env + folders.output.static + folders.output.assets + folders.output.js + options.js.fileNames.vendors + '*.js',
			},
			app: {
				input: folders.output.env + folders.output.static + folders.output.assets + folders.output.js + options.js.fileNames.app + '*.js',
			},
			all: {
				input: folders.output.env + folders.output.static + folders.output.assets + folders.output.js + options.js.fileNames.all + '*.js',
			},
		},
	},
	
	img: {
		input: folders.input.src + folders.input.static + folders.input.assets + folders.input.img + '**/*',
		output: folders.output.env + folders.output.static + folders.output.assets + folders.output.img,
	},
	
	del: {
		inputBuild: folders.output.env,
		inputPartials: folders.output.env + folders.output.static + folders.output.pages + 'partials/',
		inputLog: [folders.gulp.root + folders.gulp.log.root + folders.gulp.log.cssLint + '**/*',
				   folders.gulp.root + folders.gulp.log.root + folders.gulp.log.jsHint + '**/*'],
	},
}


module.exports = { gulp, env, plugins, options, folders, paths }