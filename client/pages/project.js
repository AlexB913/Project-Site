import $ from 'jquery';
import navbar from 'templates/projectNavbar.html';

var app = {  

  init: function(){
    $('menu').append(navbar);
  },
  render: function(){
    $('menu').append(navbar);
  }
};

module.exports = app;

