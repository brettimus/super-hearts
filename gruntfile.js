module.exports = function(grunt) {
    "use strict";

    // load all grunt npm modules
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            js: {
                files: ['dist/super-hearts.js'],
                tasks: ['uglify']
            }
        },

        // lets us use npm-style modules in the browser
        browserify: {
            'dist/super-hearts.js': ['src/js/super-hearts.js']
        },

        // for minification and compression
        uglify: {
            build: {
                files: {
                    'dist/super-hearts.min.js': ['dist/super-hearts.js']
                }
            }
        },
    });

    // default task
    // * this is what runs when we just type `grunt`
    grunt.registerTask('default', ['browserify', 'uglify']);
};