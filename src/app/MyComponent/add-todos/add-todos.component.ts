import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/Todo';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-todos',
  templateUrl: './add-todos.component.html',
  styleUrls: ['./add-todos.component.css'],
})
export class AddTodosComponent implements OnInit {
  currDiv: string = 'D';
  title: string;
  description: string;
  minDate: Date;
  date: Date;

  setDate: Date

  @Output() todoAdd: EventEmitter<Todo> = new EventEmitter();

  constructor(private toastr: ToastrService) {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
  }

  ngOnInit(): void {}

  onSubmit() {
    const todo = {
      sno: 9,
      title: this.title,
      description: this.description,
      active: true,
      color: 'light',
      date: this.date,
    };

    this.todoAdd.emit(todo);
    this.toastr.success('Todo Added');

    this.currDiv = 'D';
    this.title = '';
    this.description = '';
    this.date = new Date();
  }

  showDiv() {
    this.currDiv = 'A';
  }

  onCancel() {
    this.currDiv = 'D';

    this.title = '';
    this.description = '';
    this.date = new Date();
  }
}
