import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/Todo';


@Component({
  selector: 'app-add-todos',
  templateUrl: './add-todos.component.html',
  styleUrls: ['./add-todos.component.css']
})
export class AddTodosComponent implements OnInit {

  
  title: string;
  description: string;
  @Output() todoAdd: EventEmitter<Todo> = new EventEmitter();
  

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    const todo = {
      sno: 9,
      title: this.title,
      description: this.description,
      active: true
    }
    this.todoAdd.emit(todo);
  }
}
