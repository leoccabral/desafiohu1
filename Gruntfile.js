module.exports = function(grunt) {

    grunt.path_build = "build/"
    grunt.path_build_client = "client/"
    grunt.path_client = "source/client/";
    grunt.path_server = "source/server";

    //DEV
      var optUglify = {
        sourceMap: false,
        sourceMapIncludeSources: false,
        mangle: false,
        beautify: true,
        compress: false,
        preserveComments: 'all'
    };

    //PROD
    // var optUglify = {
    //     sourceMap: false,
    //     sourceMapIncludeSources: false,
    //     mangle: true,
    //     beautify: false,
    //     preserveComments: 'none',
    //     compress: {
    //         global_defs: {
    //             "DEBUG": false
    //         },
    //         dead_code: true,
    //         drop_console: true
    //     }
    // };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            server: ['<%= grunt.path_server %>/**/*.js'],
            client: ['<%= grunt.path_client %>js/**/*.js'],
        },
        clean: {
            build: {
                src: ['<%= grunt.path_build %>**/*'],
                options: {
                    force: true
                }
            }
        },
        copy: {
            server: {
                files: [{
                    expand: true,
                    cwd: '<%= grunt.path_server %>',
                    src: ['**'],
                    dest: '<%= grunt.path_build %>'
                }]
            },
            resources: {
                files: [{
                    expand: true,
                    cwd: '<%= grunt.path_client %>',
                    src: ['fonts/*.*', 'img/*.*'],
                    dest: '<%= grunt.path_build %><%= grunt.path_build_client %>'
                }]
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
                    cwd: '<%= grunt.path_client %>/',
                    src: ['**/*.html'],
                    dest: '<%= grunt.path_build %><%= grunt.path_build_client %>',
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
                    '<%= grunt.path_build %><%= grunt.path_build_client %>css/app.min.css': '<%= grunt.path_client %>less/app.less'
                }
            }
        },
        uglify: {
            client: {
                options: optUglify,
                files: {
                    '<%= grunt.path_build %><%= grunt.path_build_client %>js/app.min.js': [
                        '<%= grunt.path_client %>js/start.js',
                        '<%= grunt.path_client %>js/controller.js',
                        '<%= grunt.path_client %>js/directive.js'
                    ]
                }
            },
            vendor: {
                options: optUglify,
                files: {
                    '<%= grunt.path_build %><%= grunt.path_build_client %>js/lib.min.js': [
                        '<%= grunt.path_client %>vendor/jquery.js',
                        '<%= grunt.path_client %>vendor/angular.js',
                        '<%= grunt.path_client %>vendor/fwValidator.js',
                        '<%= grunt.path_client %>vendor/jquery-ui.js',
                        '<%= grunt.path_client %>vendor/datepicker-pt-BR.js'
                    ]
                }
            }
        },
        watch: {
            server: {
                files: ['server.js',
                    'controllers/*.js',
                    'routes/*.js',
                    'models/*.js'
                ],
                tasks: ['jshint:server', 'copy:server']
            },
            client: {
                files: ['<%= grunt.path_client %>js/**/*.js'],
                tasks: ['jshint:client', 'uglify:client']
            },
            less: {
                files: ['<%= grunt.path_client %>less/*.less'],
                tasks: ['less:app']
            },
            html: {
                files: ['<%= grunt.path_client %>**/*.html'],
                tasks: ['htmlmin:html']
            },
            resources: {
                files: ['<%= grunt.path_client %>fonts/*.*', '<%= grunt.path_client %>img/*.*'],
                tasks: ['copy:resources']
            },
            
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.registerTask('compile', [
        'jshint:server',
        'jshint:client',
        'clean:build',
        'copy:server',
        'copy:resources',
        'htmlmin:html',
        'less:app',
        'uglify:client',
        'uglify:vendor'
    ]);

    // Default task(s).
    grunt.registerTask('default', [
        'compile',
        'watch'
    ]);

};