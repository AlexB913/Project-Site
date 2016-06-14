var $ = require('jquery');

// legacy loading for bootstrap
window.jQuery = window.$ = $;
require('bootstrap');

import _ from 'underscore';
import Backbone from 'backbone';
import Handlebars from 'handlebars';
import todoItemTemplate from 'templates/todoItem.html';
import TodoControllerView from 'pages/todo/todoController';




var TodoItemView = Backbone.View.extend({
  tagName: 'li', // el = <li class="list-group-item"></li>
  className: 'list-group-item row', 
  events: {
    'click .close': 'removeItem',
    'change .completed-checkbox': 'completedClicked',
    'click .title': 'titleClicked',
    'keypress .title-edit-input': 'titleEditConfirm'
  },
  template: Handlebars.compile(todoItemTemplate),
  initialize: function(todo){
  	this.controller = TodoControllerView;
    this.data = todo;
    this.render();
  },
  render: function(){
    this.$el.html(this.template(this.data));
    this.$title = this.$el.find('.title');
    this.$titleEdit = this.$el.find('.title-edit');
    this.$titleInput = this.$titleEdit.find('.title-edit-input');
    this.$el.toggleClass('disabled', this.data.completed);
  },
  removeItem: function(){
    this.controller.removeItem(this.data.id);
  },
  completedClicked: function(event){
    var isChecked = $(event.target).is(':checked');
    this.controller.itemCompleted(this.data.id, isChecked);
  },
  titleClicked: function(){
    this.$title.addClass('hidden');
    this.$titleEdit.removeClass('hidden');
    this.$titleInput.focus();
  },
  titleEditConfirm: function(event){
    // they hit the enter key
    if (event.which === 13) {
      var newTitle = this.$titleInput.val();
      this.controller.titleEdit(newTitle, this.data.id);    
    }
  }
});

module.exports = TodoItemView;