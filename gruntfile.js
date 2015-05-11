module.exports = function(grunt) {
    "use strict";

    // load all grunt npm modules
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    grunt.loadNpmTasks('assemble');

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

        // Takes your scss files and compiles them to css
        sass: {
          dist: {
            options: {
              style: 'expanded'
            },
            files: {
              'dist/examples/style.css': 'src/examples/scss/style.scss',
            }
          }
        },

        // assembles hbs templates
        assemble: {
          options: {
            data: 'src/examples/templates/data/*.json',
            layoutdir: 'src/examples/templates/layouts',
            flatten  : true,
            partials : 'src/examples/templates/partials/**/*.hbs'
          },
          pages: {
            src: ['src/examples/templates/pages/*.hbs'],
            dest: 'dist/examples'
          }
        },
    });

    // default task
    // * this is what runs when we just type `grunt`
    grunt.registerTask('default', ['browserify', 'uglify', 'sass', 'assemble']);
};