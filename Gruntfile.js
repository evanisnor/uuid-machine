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
        jshint: {
            all: ['src/**/*.js', '!src/vendor/**/*.js']
        },
        requirejs: {
            compile: {
                options: {
                    appDir: 'src',
                    baseUrl: './',
                    dir: 'bin',
                    wrap: true,
                    optimizeCss: 'standard',
                    skipDirOptimize: false,
                    preserveLicenseComments: false,
                    mainConfigFile: 'src/app.js',
                    uglify: {
                        max_line_length: 1000
                    }
                }
            }
        },
        'gh-pages': {
            options: {
                base: 'bin'
            },
            src: ['**/*']
        }
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
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-gh-pages');
 
    grunt.registerTask(
        'build', 
        'Compiles all of the assets and copies the files to the build directory.', 
        [ 'clean:build', 'copy', 'jshint:all', 'requirejs:compile' ]
    );

    grunt.registerTask(
        'default', 
        'Watches the project for changes, automatically builds them and runs a server.', 
        [ 'jshint:all', 'build', 'watch' ]
    );
};