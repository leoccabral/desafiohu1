module.exports = function(grunt) {

    grunt.path_build_client = "client/build/"
    grunt.path_client = "client/";

var file_server = ['server.js', 'controllers/*.js', 'routes/*.js', 'models/*.js'];
    //DEV
    //   var optUglify = {
    //     sourceMap: false,
    //     sourceMapIncludeSources: false,
    //     mangle: false,
    //     beautify: true,
    //     compress: false,
    //     preserveComments: 'all'
    // };

    //DEV
    var optUglify = {
        sourceMap: false,
        sourceMapIncludeSources: false,
        mangle: true,
        beautify: false,
        preserveComments: 'none',
        compress: {
            global_defs: {
                "DEBUG": false
            },
            dead_code: true,
            drop_console: true
        }
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            server: file_server,
            client: ['<%= grunt.path_client %>js/**/*.js'],
        },
        clean: {
            client: {
                src: ['<%= grunt.path_build_client %>**/*'],
                options: {
                    force: true
                }
            }
        },
        uglify: {
            client: {
                options: optUglify,
                files: {
                    '<%= grunt.path_build_client %>app.min.js': [
                        '<%= grunt.path_client %>js/start.js',
                        '<%= grunt.path_client %>js/controller.js',
                        '<%= grunt.path_client %>js/directive.js'
                    ]
                }
            },
            vendor: {
                options: optUglify,
                files: {
                    '<%= grunt.path_build_client %>lib.min.js': [
                        '<%= grunt.path_client %>vendor/jquery.js',
                        '<%= grunt.path_client %>vendor/angular.js',
                        '<%= grunt.path_client %>vendor/fwValidator.js',
                        '<%= grunt.path_client %>vendor/jquery-ui.js',
                        '<%= grunt.path_client %>vendor/datepicker-pt-BR.js'
                    ]
                }
            }
        },
        less: {
            app: {
                options: {
                    paths: ['<%= grunt.path_client %>less/'],
                    ieCompat: true,
                    compress: true,
                    cleancss: true
                },
                files: {
                    '<%= grunt.path_build_client %>app.min.css': '<%= grunt.path_client %>less/app.less'
                }
            }
        },
        watch: {
            server: {
                files: ['server.js',
                'controllers/*.js',
                'routes/*.js',
                'models/*.js'],
                tasks: ['jshint:server']
            },
            client: {
                files: ['<%= grunt.path_client %>js/**/*.js'],
                tasks: ['jshint:client', 'uglify:client']
            },
            less: {
                files: ['<%= grunt.path_client %>less/*.less'],
                tasks: ['less:app']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('default', [
        'jshint:server',
        'jshint:client',
        'clean:client',
        'less:app',
        'uglify:client',
        'uglify:vendor'
    ]);
    
    // Default task(s).
    grunt.registerTask('watch', [
        'default',
        'watch'
    ]);

};