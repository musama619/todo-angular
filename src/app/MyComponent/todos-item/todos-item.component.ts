import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/Todo';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-todos-item',
  templateUrl: './todos-item.component.html',
  styleUrls: ['./todos-item.component.css'],
})
export class TodosItemComponent implements OnInit {
  ngOnInit(): void {}

  // todoColor: any;
  localItem: string;
  todos: Todo[];
  color: string;

  content: string;
  title: string;

  date: string;
  colorChanger: string;
  minDate: Date;

 

  @Input() todo: Todo;
  @Input() i: number;
  @Output() todoDelete: EventEmitter<Todo> = new EventEmitter();
  @Output() todoCheckbox: EventEmitter<Todo> = new EventEmitter();
  @Output() todoColor: EventEmitter<{ todo: Todo; color: string }> =
    new EventEmitter();
  @Output() todoDate: EventEmitter<{ todo: Todo; date: string }> =
    new EventEmitter();

  constructor(private toastr: ToastrService) {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());

   
  }

  onClick(todo) {


    this.todoDelete.emit(todo);
    console.log('close');
  }

  onCheckboxClick(todo) {
    this.todoCheckbox.emit(todo);
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

    $('#exampleModal' + this.i).modal('show');
  }

  saveDate(todo: Todo, date) {
    this.todoDate.emit({ todo: todo, date: date });


    this.toastr.success('Changes Successful')

  }

  
}
