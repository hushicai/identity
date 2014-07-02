module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                //jshintrc: true
            },
            files: [
                'src/**/*.js',
                'test/**/*.js'
            ]
        },
        connect: {
            server: {
                options: {
                    port: 8889,
                    basee: '.',
                    host: 'localhost'
                }
            },
            test: {
                options: {
                    port: 8888
                }
            }
        },
        jasmine: {
            requirejs: {
                src: 'src/**/*.js',
                options: {
                    outfile: 'SpecRunner.html',
                    //keepRunner: true,
                    specs: 'test/spec/**/*.js',
                    host: 'http://localhost:<%= connect.test.options.port%>',
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                       requireConfig: {
                           baseUrl: 'src',
                           urlArgs: '?' + (+new Date).toString(36)
                       }
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('main', ['jshint']);
    grunt.registerTask('server', ['main', 'connect:server:keepalive']);
    grunt.registerTask('test', ['main', 'connect:test', 'jasmine:requirejs']);
};
