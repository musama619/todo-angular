import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/Todo';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';

declare var $: any;

@Component({
  selector: 'app-todos-item',
  templateUrl: './todos-item.component.html',
  styleUrls: ['./todos-item.component.css'],
})
export class TodosItemComponent implements OnInit {
  ngOnInit(): void {
    this.getDate = new Date(this.todo.date);

    if (isNaN(this.getDate.getTime())) {
      this.difference = null;
    } else {
      this.beforeDifference = this.getDate.getTime() - this.newDate.getTime();

      this.difference = Math.round(
        Math.abs(this.beforeDifference / (1000 * 3600 * 24))
      );
    }

    const date_N = new Date(this.todo.date);

    this.todo.date = date_N;

    this.cardDate = this.todo.date.toLocaleDateString()

  }

  localItem: string;
  todos: Todo[];
  color: string;
  content: string;
  title: string;
  date: Date;
  colorChanger: string;
  minDate: Date;
  newDate = new Date();
  getDate: Date;
  beforeDifference: any;
  difference: number;
  previousDate: Date;
  checkDone: Boolean;
  durationInSeconds = 2;
  cardDate: any;
  @Input() todo: Todo;
  @Input() i: number;
  @Output() todoDelete: EventEmitter<Todo> = new EventEmitter();
  @Output() todoCheckbox: EventEmitter<Todo> = new EventEmitter();
  @Output() todoColor: EventEmitter<{ todo: Todo; color: string }> =
    new EventEmitter();
  @Output() todoDate: EventEmitter<Todo> = new EventEmitter();

  constructor(private toastr: ToastrService, private _snackBar: MatSnackBar) {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
  }

  onClick(todo) {
    this.todoDelete.emit(todo);
    console.log('close');
  }

  onCheckboxClick(todo) {
    this.todoCheckbox.emit(todo);

    if (this.todo.active) {
      this._snackBar.open("'" + this.todo.title + "' Unmarked", 'OK', {
        duration: this.durationInSeconds * 1000,
      });
    } else {
      this._snackBar.open("'" + this.todo.title + "' Marked as Done", 'OK', {
        duration: this.durationInSeconds * 1000,
      });
    }
  }

  colorChanger_N(color) {
    this.colorChanger = color;
  }

  changeColor(todo: Todo, color) {
    // var colorR = color;
    // this.todoColor = colorR
    this.todoColor.emit({ todo: todo, color: color });

    // console.log(color)
  }

  showModalDetails(todo) {
    this.content = this.todo.description;
    this.title = this.todo.title;
    this.date = this.todo.date;
    $('#exampleModal' + this.i).modal('show');
  }

  saveDate(todo: Todo) {
    console.log('Received Raw: ' + todo.date);

    const date_N = new Date(this.todo.date);

    todo.date = date_N;

    todo.date = this.adjustDateForTimeOffset(todo.date);

    this.cardDate = todo.date.toLocaleDateString()

    this.getDate = this.todo.date;

    this.beforeDifference = this.getDate.getTime() - this.newDate.getTime();

    console.log('before difference: ' + this.beforeDifference);

    this.difference = Math.round(
      Math.abs(this.beforeDifference / (1000 * 3600 * 24))
    );

    this.todoDate.emit(todo);
    this.toastr.success('Changes Successful');

    $('#exampleModal' + this.i).modal('hide');
  }

  adjustDateForTimeOffset(dateToAdjust) {
    var offsetMs = dateToAdjust.getTimezoneOffset() * 60000;
    return new Date(dateToAdjust.getTime() - offsetMs);
  }

  onDateChange(newDate: Date) {
    console.log('new date: ' + newDate);
  }
}
