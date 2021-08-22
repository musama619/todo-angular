import { Component, OnInit } from '@angular/core';
import { Todo } from '../../Todo';
import { Tooltip } from 'node_modules/bootstrap/dist/js/bootstrap.esm.min.js'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {

  
  ngOnInit() {
    
  }
  localItem: string;
  todos: Todo[];
  constructor() {
    this.localItem = localStorage.getItem("todos");
    if (this.localItem == null) {
      this.todos = [];
    } else {
      this.todos = JSON.parse(this.localItem);
    }
    
  }

  // ngOnInit(): void {}

  deleteTodo(todo: Todo){
    const index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(this.todos))
  }

  addTodo(todo: Todo){
    this.todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(this.todos))
  }

  strikeTodo(todo: Todo){
    const index = this.todos.indexOf(todo);
    this.todos[index].active = !this.todos[index].active 
    localStorage.setItem("todos", JSON.stringify(this.todos))
  }
}
