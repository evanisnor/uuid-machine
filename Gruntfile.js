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
        requirejs: {
            compile: {
                options: {
                    appDir: 'src',
                    baseUrl: './',
                    dir: 'bin',
                    optimizeCss: 'standard',
                    skipDirOptimize: false,
                    preserveLicenseComments: false,
                    wrap: true,
                    mainConfigFile: 'src/app.js',
                    uglify: {
                        max_line_length: 1000
                    }
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
        }
    });
 
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
 
    grunt.registerTask(
        'build', 
        'Compiles all of the assets and copies the files to the build directory.', 
        [ 'clean:build', 'copy', 'requirejs:compile' ]
    );

    grunt.registerTask(
        'default', 
        'Watches the project for changes, automatically builds them and runs a server.', 
        [ 'build', 'watch' ]
    );
};