
import $ from 'jquery';
import 'styles/main.scss';
import todos from 'pages/todo-backbone';
import project from 'pages/project';
import extra from 'pages/extra';
import funnySquares from 'pages/funnySquares';
import threeExample from 'pages/3dsExample';
import header from 'components/header';
import footer from 'components/footer';

$(function(){

  header.init();
  footer.init();

	// what page are we on?
  var url = window.location.pathname;

	// our first javascript router

  switch (url){
    case '/pages/todo.html':
	todos.render();
	break;
    case '/pages/project.html':
	project.init();
	break;
    case '/pages/extra.html':
	extra.init();
	break;
    case '/pages/funnySquares.html':
	funnySquares.init();
	break;
    case '/pages/3dsExample.html':
  threeExample.init();
    default:
  // do nothing
  }

  // Fancy Console Message For Developers
console.log("=======================================")
console.log("======WELCOME TO MY PROJECT PAGE!======")
console.log("=======================================")
console.log("=======================================")
console.log("=======================================")
console.log("=======================================")


});
