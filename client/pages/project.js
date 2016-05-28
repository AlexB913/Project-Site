import $ from 'jquery';
import navbar from 'templates/projectNavbar.html';
import main from 'templates/projectMain.html';

var app = {  

  init: function(){
    $('menu').append(navbar);
    $('projectMain').append(main);
  },
  render: function(){
    $('menu').append(navbar);
    $('projectMain').append(main);
  }
};

module.exports = app;

