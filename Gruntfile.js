module.exports = function(grunt) {
 
    // configure the tasks
    grunt.initConfig({
 
        copy: {
            build: {
                cwd: 'app',
                src: [ '**' ],
                dest: 'bin',
                expand: true
            },
        },
        clean: {
            build: {
                src: [ 'bin' ]
            },
            stylesheets: {
                src: [ 'bin/**/*.css', '!bin/uuid-machine.css' ]
            },
            scripts: {
                src: [ 'bin/**/*.js', '!bin/uuid-machine.js' ]
            }
        },
        cssmin: {
            build: {
                files: {
                    'bin/uuid-machine.css': [ 'bin/**/*.css' ]
                }
            }
        },
        uglify: {
            build: {
                options: {
                    mangle: false
                },
                files: {
                    'bin/uuid-machine.js': [ 'bin/**/*.js' ]
                }
            }
        },
        watch: {
            stylesheets: {
                files: 'app/**/*.css',
                tasks: [ 'stylesheets' ]
            },
            scripts: {
                files: 'app/**/*.js',
                tasks: [ 'scripts' ]
            },
            copy: {
                files: [ 'app/**', '!app/**/*.css', '!app/**/*.js' ],
                tasks: [ 'copy' ]
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: "app",
                    dir: "bin",
                    skipDirOptimize: false,
                    preserveLicenseComments: false,
                    mainConfigFile: "app/app.js",
                    modules: [
                        { name: "controller/machine" },
                        { name: "enum/uuidformat" },
                        { name: "util/uuid" },
                        { name: "view/generator/generator" },
                        { name: "view/main/main" },
                    ]
                }
            }
        }
    });
 
    // load the tasks
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
 
    // define the tasks
    grunt.registerTask(
        'build', 
        'Compiles all of the assets and copies the files to the build directory.', 
        [ 'clean:build', 'copy', 'cssmin', 'requirejs:compile' ]
    );

    grunt.registerTask(
        'default', 
        'Watches the project for changes, automatically builds them and runs a server.', 
        [ 'build', 'watch' ]
    );
};