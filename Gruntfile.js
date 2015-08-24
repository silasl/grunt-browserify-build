module.exports = function (grunt) {
    grunt.initConfig({
        bower_concat: {
            all: {
                cssDest: 'src/client/less/vendor.less'
            }
        },
        browserifyBower: {
            options: {
                file: 'public/js/vendor/vendor.js',
                shim: {
                    'jquery': {
                        exports: '$'
                    }
                }
            },
            target: 'public/js/vendor/vendor.js'
        },
        less: {
            all: {
                files: {
                    'public/css/styles.css': 'src/client/less/main.less'
                }
            },
            dev: {
                options: {
                    sourceMap: true
                }
            },
            release: {
                options: {
                    sourceMap: false
                }
            }
        },
        postcss: {
            dev: {
                options: {
                    map: true,
                    processors: [
                        require('autoprefixer-core')({browsers: 'last 1 version'})
                    ]
                },
                files: {
                    'public/css/styles.css': 'public/css/styles.css'
                }
            },
            release: {
                options: {
                    map: false,
                    processors: [
                        require('csswring')
                    ]
                },
                files: {
                    'build/css/styles.min.css': 'public/css/styles.css'
                }
            }
        },
        browserify: {
            all: {
                files: {
                    'public/js/module.js': ['src/index.js']
                }
            },
            dev: {
                options: {
                    browserifyOptions: {
                        debug: true
                    },
                    watch: true
                }
            },
            release: {
                options: {
                    browserifyOptions: {
                        debug: false
                    }
                }
            }
        },
        uglify: {
            js: {
                options: {
                    preserveComments: false,
                    ASCIIOnly: true
                },
                files: {
                    'build/application.min.js': ['public/js/module.js'],
                    'build/vendor.min.js': ['public/js/vendor/vendor.js']
                }
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'src/**/*.js']
        },
        watch: {
            js: {
                files: ['public/js/module.js'],
                tasks: ['js-compile-dev'],
                options: {
                    livereload: true
                }
            },
            less: {
                files: [
                    'src/client/**/*.less'
                ],
                tasks: ['css-compile-dev'],
                options: {
                    livereload: true
                }
            }
        }
    });

    for (var key in grunt.file.readJSON('package.json').devDependencies) {
        if (key !== 'grunt' && key !== 'grunt-cli' && key.indexOf('grunt') === 0) {
            grunt.loadNpmTasks(key);
        }
    }

    // Master
    grunt.registerTask('dev', ['bower_concat', 'css-compile-dev', 'browserifyBower', 'js-compile-dev', 'watch']);
    grunt.registerTask('release', ['bower_concat', 'css-compile-rel', 'browserifyBower', 'js-compile-rel']);

    // Slave
    grunt.registerTask('css-compile-dev', ['less:dev', 'postcss:dev']);
    grunt.registerTask('js-compile-dev', ['browserify:dev', 'jshint']);

    grunt.registerTask('css-compile-rel', ['less:release', 'postcss:release']);
    grunt.registerTask('js-compile-rel', ['browserify:release', 'uglify']);
};
