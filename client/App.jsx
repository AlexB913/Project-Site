
import $ from 'jquery';
import 'styles/main.scss';
import todos from 'pages/todo';
import project from 'pages/project';
import extra from 'pages/extra';

$(function(){

	// what page are we on?
	var url = window.location.pathname;

	// our first javascript router

		switch(url){
		case '/pages/todo.html':
		todos.init()
		break;
		case '/pages/project.html':
		// init project javascript
		break;
		case '/pages/extra.html':
		// init extra javascript
		break;
}
});
