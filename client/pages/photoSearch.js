import $ from 'jquery';

var app = {
    init: function(){
      app.render();
    },
    render: function(){
      app.$input = $('.search-container input');
      app.bindEvents();
    },
    bindEvents: function(){
      app.$input.on('keypress', app.searchKeypress);
    },
    searchKeypress: function(event){
      if (event.which === 13) {
        app.doSearch();
      }
    },
    doSearch: function(){
      var phrase = app.$input.val();
      $.ajax({
        url: 'https://api.flickr.com/services/rest',
        method: 'GET',
        data: {
          text: phrase,
          method: 'flickr.photos.search',
          api_key: '731717db25329eb6aa65703cb6b71970',
          format: 'json',
          per_page: 3
        },
        complete: function(response){
          var text = response.responseText;
          text = text.slice(14, text.length - 1);
          var data = JSON.parse(text);
          app.renderResults(data);
        }
      });
    },
    renderResults: function(data){
      // pass data to the template
      // append result to the .search-result div
    }
};

module.exports = app;