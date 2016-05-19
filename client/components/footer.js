
import $ from 'jquery';
import socIcons from 'templates/socIcons.html';

var app = {
  init: function(){
    $('footer').append(socIcons);
  },
  render: function(){
    $('footer').append(socIcons);
  }
};

module.exports = app;
