module.exports = function(grunt) {
 
    grunt.initConfig({
 
        copy: {
            build: {
                cwd: 'src',
                src: [ '**' ],
                dest: 'bin',
                expand: true
            },
        },
        clean: {
            build: {
                src: [ 'bin' ]
            }
        },
        cssmin: {
            build: {
                files: {
                    'bin/uuid-machine.css': [ 'bin/**/*.css' ]
                }
            }
        },
        watch: {
            stylesheets: {
                files: 'src/**/*.css',
                tasks: [ 'stylesheets' ]
            },
            scripts: {
                files: 'src/**/*.js',
                tasks: [ 'scripts' ]
            },
            copy: {
                files: [ 'src/**', '!src/**/*.css', '!src/**/*.js' ],
                tasks: [ 'copy' ]
            }
        },
        requirejs: {
            compile: {
                options: {
                    appDir: "src",
                    baseUrl: "./",
                    dir: "bin",
                    skipDirOptimize: false,
                    preserveLicenseComments: false,
                    mainConfigFile: "src/app.js",
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
 
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
 
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