/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jasmine: {
      src: ['backbone.fetch-cache.js'],
      options: {
        helpers: [
          'spec/support/matchers.js',
          'node_modules/sinon/lib/sinon.js'
        ],
        specs : 'spec/**/*.spec.js',
        vendor: [
          'node_modules/jquery/dist/jquery.js',
          'node_modules/underscore/underscore.js',
          'node_modules/backbone/backbone.js'
        ],
        timeout : 5000,
        phantomjs : { 'ignore-ssl-errors' : true }
      }
    },

    connect: {
      spec : {
        options: {
          port : 8000
        }
      }
    },

    uglify: {
      options: {
        banner: '/*  <%= pkg.name %> v<%= pkg.version %> ' +
        "(<%= grunt.template.today('yyyy-mm-dd') %>)\n" +
        "  by <%= pkg.author %> - <%= pkg.repository.url %>\n" +
        ' */\n',
        mangle: {
          except: ['_', 'Backbone']
        }
      },
      dist: {
        files: {
          'backbone.fetch-cache.min.js': ['backbone.fetch-cache.js']
        }
      }
    },

    watch: {
      files: '<%= jshint.files %>',
      tasks: ['jshint', 'jasmine']
    },

    jshint: {
      files: ['grunt.js', 'backbone.fetch-cache.js', 'spec/**/*.spec.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('spec-server', ['jasmine::build', 'connect:spec:keepalive']);

  // Default task.
  grunt.registerTask('default', ['jshint', 'jasmine']);

};
