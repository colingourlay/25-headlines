/*global module:false*/
module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		clean: {
			dev: ['.dev'],
			dist: ['dist']
		},

		jshint: {
			files: [
				'src/js/**/*.js'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		browserify: {
			options: {
				transform: ['reactify']
			},
			dev: {
				options: {
					debug: true
				},
				files: {
					'.dev/js/app.js': ['src/js/app.jsx']
				}
			},
			dist: {
				files: {
					'dist/js/app.js': ['src/js/app.jsx']
				}
			}
		},

		uglify: {
			dist: {
				files: {
					'dist/js/app.js': ['dist/js/app.js']
				}
			}
		},

		stylus: {
			dev: {
				files: {
					'.dev/css/app.css': 'src/css/app.styl'
				}
			},
			dist: {
				files: {
					'dist/css/app.css': 'src/css/app.styl'
				}
			}
		},

		copy: {
			filesdev: {
				files: [{
					expand: true,
					cwd: 'src/files',
					src: ['**'],
					dest: '.dev/files/'
				}]
			},
			files: {
				files: [{
					expand: true,
					cwd: 'src/files',
					src: ['**'],
					dest: 'dist/files/'
				}]
			},
			rootdev: {
				files: [{
					expand: true,
					cwd: 'src/',
					src: ['*.*'],
					dest: '.dev/'
				}]
			},
			root: {
				files: [{
					expand: true,
					cwd: 'src/',
					src: ['*.*'],
					dest: 'dist/'
				}]
			}
		},

		connect: {
			dev: {
				options: {
					port: 8000,
					hostname: '*',
					base: '.dev/'
				}
			}
		},

		watch: {
			js: {
				files: 'src/js/**/*',
				tasks: ['jshint', 'browserify:dev'],
				interrupt: true
			},
			css: {
				files: 'src/css/**/*.styl',
				tasks: 'stylus:dev',
				interrupt: true
			},
			files: {
				files: 'src/files/**/*',
				tasks: 'copy:filesdev',
				interrupt: true
			},
			root: {
				files: 'src/*.*',
				tasks: 'copy:rootdev',
				interrupt: true
			}
		}

	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('dev', [
		'clean:dev',
		'jshint',
		'browserify:dev',
		'stylus:dev',
		'copy:filesdev',
		'copy:rootdev'
	]);

	grunt.registerTask('default', [
		'dev',
		'connect',
		'watch'
	]);

	grunt.registerTask('dist', [
		'clean:dist',
		'jshint',
		'browserify:dist',
		'uglify:dist',
		'stylus:dist',
		'copy:files',
		'copy:root'
	]);

};
