
import $ from 'jquery';
import navbar from 'templates/navbar.html';


var app = {
  init: function(){
    $('header').append(navbar);
  },
  render: function(){
    $('header').append(navbar);
  }
};

module.exports = app;
 