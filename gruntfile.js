var fs = require("fs");
var path = require("path");

var aliases = {};
fs.readdirSync("src/js/prototypes/heart/mixins").forEach(function(file) {
    aliases[aliasFileName(file)] = fileName(file);
});
// console.log(aliases);
function aliasFileName(name) {
    return path.basename(name, path.extname(name));
}
function fileName(name) {
    return "./" + path.basename(name, path.extname(name) + ".js"); // this is silly, i know
}

// function forRequire() {
//     var result = fs.readdirSync("src/js/mixins").map(function(m) { return ["./"+m, {expose: aliasFileName(m),} ]; } );
//     console.log(result);
//     return result;
// }

module.exports = function(grunt) {
    "use strict";
    // load all grunt npm modules
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    grunt.loadNpmTasks('assemble');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            js: {
                files: ['src/js/**/*.js'],
                tasks: ['buildjs'],
                options: {
                    interrupt: true,
                },
            },
            css: {
                files: ['src/scss/**/*.scss'],
                tasks: ['sass'],
                options: {
                    interrupt: true,
                },
            },
        },


        // lets us use npm-style modules in the browser
        browserify: {
            alias: aliases,
            dist: {
              files: {
                'dist/super-hearts.js': ['src/js/**/*.js'],
              },
            },
            // require: forRequire(),
            plugin: ["brfs"],
        },

        // for minification
        uglify: {
            build: {
                files: {
                    'dist/super-hearts.min.js': ['dist/super-hearts.js'],
                    'lp/super-hearts.min.js': ['dist/super-hearts.js']
                }
            }
        },

        // compiles example styles
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

        // compiles example markup
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
    // * this is what runs when we just type `grunt` *
    grunt.registerTask('default', ['browserify', 'uglify', 'sass', 'assemble']);
    grunt.registerTask('buildjs', ['browserify', 'uglify']); // don't build sass or docs bc they're sloowwwww

};