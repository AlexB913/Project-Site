
var $ = require('jquery');

// legacy loading for bootstrap
window.jQuery = window.$ = $;
require('bootstrap');

import _ from 'underscore';
import Handlebars from 'handlebars';
import lscache from 'lscache';
import rawTemplate from 'templates/todoItem.html';
import modalTemplate from 'templates/todoModal.html';

// Data Model
var todoSchema = function(todo){
  return _.defualts(todo, {
    id: 0,
    title: "", 
    completed: false  
  });
} 

var savedData = lscache.get('todos');
var todos;
if (savedData === null) {
  todos = [];
} else {
  todos = savedData;
} 

// Application 
var template;
var app = {
  init: function(){      
    app.compileTemplates();
    app.render();
  },
  render: function(){
    // render the todos
    lscache.set('todos', todos);
    var todoHtml = todos.map(function(todo){
      return template(todo);
    });
    app.unbindEvents();
    $('.list-group').html(todoHtml.join(''));
    app.bindEvents();
  },
  compileTemplates: function(){
    template = Handlebars.compile(rawTemplate);
  },
  unbindEvents: function(){
    $('.list-group-item').off();
    $('.add-todo-container button').off();
    $('input[type="checkbox"]').off();
    $('.list-group-item button').off();
    $('.title-edit input').off();
  },
  bindEvents: function(){
    app.bindHoverEvents();
    app.bindCheckboxEvents();
    app.bindAddTodoEvents();
    app.bindRemoveTodoEvents();
    app.bindAddTodoEventsOnEnter();
    app.bindEditTodoEvents();
  },
  bindHoverEvents: function(){      
    var $items = $('.list-group-item');
    $items.on('mouseover', function(){
      $(this).addClass('list-group-item-success');
    });
    $items.on('mouseout', function(){
      $(this).removeClass('list-group-item-success');
    });
  },
    bindCheckboxEvents: function(){
      var $checkboxes = $('input[type="checkbox"]');
      $checkboxes.on('change', function(){
        var wasChecked = $(this).is(':checked');
        if (!wasChecked) {
          $(this).parent().parent().removeClass('disabled');
        } else {
          $(this).parent().parent().addClass('disabled');
        }
      });
    },
   bindAddTodoEvents: function(){
     var handleEvent = function(){
       var newTodoTitle = $('.add-todo-container input').val();
       if ($.type(newTodoTitle) === 'string' && newTodoTitle.length > 2) {
         var newTodoObject = todoSchema({ 
          id: todos.length, 
          title: newTodoTitle, 
          completed: false
          });
         todos.push(newTodoObject);
         $('.add-todo-container input').val('');
         app.render();
       }
     };
     $('.add-todo-container button').on('click', handleEvent);
   },
  bindRemoveTodoEvents: function(){
    $('.list-group-item button').on('click', function(){
      var index = $(this).parent().parent().index();
      todos.splice(index, 1);
      app.render();
    });
  },
  bindAddTodoEventsOnEnter: function(){
    $(document).keypress( function(event) {
      var kcode = (event.keyCode);
      if (kcode === 13) {
        var newTodoTitle = $('.add-todo-container input').val();
        if ($.type(newTodoTitle) === 'string' && newTodoTitle.length > 2) {
          var newTodoObject = { title: newTodoTitle, completed: false };
          todos.push(newTodoObject);
          $('.add-todo-container input').val('');
          app.render(); 
        }
      }
    });
  },
  bindEditTodoEvents: function(){



    $('body').append(modalTemplate);

    $('.title').on('click', function(){
      var whichTodo = $(this).attr('data-id');
      whichTodo = parseInt(whichTodo, 10);
      var editTodo = todos[whichTodo];
      var compiledTemplate = Handlebars.compile(modalTemplate);
      var fullHtml = compiledTemplate(editTodo);

      $('body').append(fullHtml);

      $('.modal').modal();

      $('.close, btn-default, .modal-backdrop').on('click'), function(){
        $('.modal, .modal-backdrop').remove();
      }

    });

    //   var $parent = $(this).parent();
    //   $parent.find('.title').addClass('hidden');
    //   $parent.find('.title-edit').removeClass('hidden');
    // });
    // $('.title-edit input').on('keypress', function(event){
    //   var kcode = (event.keyCode);
    //   if (kcode === 13) {
    //     var newTitle = $(this).val(); 
    //     var editId = $(this).attr('data-id');
    //     editId = parseInt(editId, 10);
    //     var editTodo = _.filter(todos, function(todo){
    //         if (todo.id === editId) {
    //           return true; 
    //         }
    //         return false;
    //       });
    //     editTodo = editTodo[0];
    //     editTodo.title = newTitle;
    //     app.render();
    //  }
    // });
  }
};

module.exports = app;
