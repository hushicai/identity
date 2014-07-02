module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: [
                'src/**/*.js',
                'test/**/*.js'
            ]
        },
        connect: {
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

    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('test', ['default', 'connect:test', 'jasmine:requirejs']);
};
