module.exports = function(grunt) {

    grunt.path_build_client = "client/"
    grunt.path_client = "client/_src/";

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
            server: ['server.js', 'controllers/*.js', 'routes/*.js', 'models/*.js'],
            client: ['<%= grunt.path_client %>js/**/*.js'],
        },
        clean: {
            client: {
                src: ['<%= grunt.path_build_client %>**/*','!<%= grunt.path_build_client %>src'],
                options: {
                    force: true
                }
            }
        },
        copy: {
            resource: {
                files: [{
                    expand: true,
                    cwd: '<%= grunt.path_client %>',
                    src: ['fonts/*.*', 'img/*.*'],
                    dest: '<%= grunt.path_build_client %>'
                }]
            }
        },
        uglify: {
            client: {
                options: optUglify,
                files: {
                    '<%= grunt.path_build_client %>js/app.min.js': [
                        '<%= grunt.path_client %>js/start.js',
                        '<%= grunt.path_client %>js/controller.js',
                        '<%= grunt.path_client %>js/directive.js'
                    ]
                }
            },
            vendor: {
                options: optUglify,
                files: {
                    '<%= grunt.path_build_client %>js/lib.min.js': [
                        '<%= grunt.path_client %>vendor/jquery.js',
                        '<%= grunt.path_client %>vendor/angular.js',
                        '<%= grunt.path_client %>vendor/fwValidator.js',
                        '<%= grunt.path_client %>vendor/jquery-ui.js',
                        '<%= grunt.path_client %>vendor/datepicker-pt-BR.js'
                    ]
                }
            }
        },
        htmlmin: {
            html: {
                options: {
                    removeComments: true,
                    collapseWhitespace: false
                },
                files: [{
                    expand: true,
                    cwd: '<%= grunt.path_client %>',
                    src: ['**/*.html'],
                    dest: '<%= grunt.path_build_client %>',
                    filter: 'isFile'
                }]
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
                    '<%= grunt.path_build_client %>css/app.css': '<%= grunt.path_client %>less/app.less'
                }
            }
        },
        watch: {
            server: {
                files: ['<%= grunt.path_server %>**/*.js'],
                tasks: ['jshint:server']
            },
            client: {
                files: ['<%= grunt.path_client %>js/**/*.js'],
                tasks: ['jshint:client', 'uglify:client']
            },
            html: {
                files: ['<%= grunt.path_client %>**/*.html'],
                tasks: ['htmlmin:html']
            },
            less: {
                files: ['<%= grunt.path_client %>less/*.less'],
                tasks: ['less:app']
            },
            resource: {
                files: ['<%= grunt.path_client %>fonts/*.*', '<%= grunt.path_client %>img/*.*'],
                tasks: ['copy:resource']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    // Default task(s).
    grunt.registerTask('default', [
        'jshint:server',
        'jshint:client',
        'clean:client',
        'copy:resource',
        'htmlmin:html',
        'less:app',
        'uglify:client',
        'uglify:vendor',
        'watch'
    ]);

};