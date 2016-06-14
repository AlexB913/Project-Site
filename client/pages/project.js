import $ from 'jquery';
import navbar from 'templates/projectNavbar.html';
import main from 'templates/projectMain.html';
import about from 'templates/projectAbout.html';
import work from 'templates/projectWork.html';
import contact from 'templates/projectContact.html';
import region from 'templates/projectRegion.html';

var app = {  

  init: function(){
    app.render();
  },
  render: function(){
    $('menu').append(navbar);
    $('.project-main').append(main);
    app.unbindEvents();
    app.bindEvents();
  },
  bindEvents: function(){
    app.displayAbout();
    app.displayWork();
    app.displayContact();
    app.displayRegion();
  },
  unbindEvents: function(){
    $('.about').off();
    $('.work').off();
    $('.contact').off();
    $('.region').off();
  },
  displayAbout: function(){
    $('.about').on('click', function(){
      $('.project-main').html(about);
    });
  },
  displayWork: function(){
    $('.work').on('click', function(){
      $('.project-main').html(work);
    });
  },
  displayContact: function(){
    $('.contact').on('click', function(){
      $('.project-main').html(contact);
    });
  },
  displayRegion: function(){
    $('.region').on('click', function(){
      $('.project-main').html(region);
    });
  }
};

module.exports = app;
