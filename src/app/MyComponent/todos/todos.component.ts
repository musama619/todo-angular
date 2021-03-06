import { Component, OnInit } from '@angular/core';
import { Todo } from '../../Todo';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {

  color: string;
  date: Date;
  localItem: string;
  todos: Todo[];

  ngOnInit() {}

  constructor() {
    this.localItem = localStorage.getItem('todos');
    if (this.localItem == null) {
      this.todos = [];
    } else {

      this.todos = JSON.parse(this.localItem);
    }
  }

  deleteTodo(todo: Todo) {
    Swal.fire({
      title: 'Delete Todo: "' + todo.title + '"',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Todo "' + todo.title + '" has been deleted.', 'success');

        const index = this.todos.indexOf(todo);
        this.todos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(this.todos));
      }
    });
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  strikeTodo(todo: Todo) {
    const index = this.todos.indexOf(todo);
    this.todos[index].active = !this.todos[index].active;
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  changeColor(data) {
    const index = this.todos.indexOf(data.todo);
    const col = data.color;
    this.todos[index].color = col;
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  applyDate(todo: Todo) {
    const index = this.todos.indexOf(todo);

    console.log("Received date: " +todo.date)
    // const col = todo.date;
    // this.todos[index].date = new Date(col).toISOString().split('T')[0];

    console.log("After split date: " +todo.date)

    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}
