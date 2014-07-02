'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var CbitsGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('This is a generator to create a PhoneGap app using AngularJS. Booyah.'));

    var prompts = [{
      name: 'appName',
      message: 'What would you like to name this app?',
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('css');
    this.mkdir('js');
    this.mkdir('partials');

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
  },

  copyMainFiles: function() {
    this.copy('_index.html', 'index.html');
    this.copy('_main.css', 'css/main.css');
    this.directory('../js','js');
    this.directory('../partials','partials');


    var context = {
      site_name: this.appName
    };

    this.template('_index.html', 'index.html', context);

  }
});

module.exports = CbitsGenerator;
