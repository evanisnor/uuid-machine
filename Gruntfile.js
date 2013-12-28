module.exports = function(grunt) {
 
    grunt.initConfig({
 
        copy: {
            build: {
                cwd: 'src',
                src: [ 'index.html', 'app.js', 'bower.json', 'controller/**', 'enum/**', 'util/**', 'view/**' ],
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
            all: ['src/**/*.js', '!src/bower_components/**/*.js']
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: './src',
                    fileExclusionRegExp: /bower_components/,
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
        },
        shell: {
            'bower-install': {
                options: {
                    execOptions: {
                        cwd: 'bin'
                    },
                    stdout: true
                },
                command: 'bower install'
            }
        },
        watch: {
            build: {
                files: [ 'src/**/*',],
                tasks: [ 'build' ]
            },
        }
    });
 
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-shell');
 
    grunt.registerTask(
        'build', 
        'Compiles all of the assets and copies the files to the build directory.', 
        [ 'jshint:all', 'clean:build', 'copy', 'requirejs:compile', 'shell:bower-install' ]
    );

    grunt.registerTask(
        'publish',
        'Compiles all assets and copies the result to the gh-pages branch.',
        [ 'build', 'gh-pages' ]
    );

    grunt.registerTask(
        'default', 
        'Watches the project for changes, automatically builds them and runs a server.', 
        [ 'build', 'watch' ]
    );
};