import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/Todo';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-todos-item',
  templateUrl: './todos-item.component.html',
  styleUrls: ['./todos-item.component.css'],
})
export class TodosItemComponent implements OnInit {
  ngOnInit(): void {

    this.getDate = new Date(this.todo.date)

    this.beforeDifference = this.getDate.getTime() - this.newDate.getTime() 

    this.difference = Math.round(Math.abs(this.beforeDifference / (1000 * 3600 * 24)));

   
  }

  // todoColor: any;
  localItem: string;
  todos: Todo[];
  color: string;

  content: string;
  title: string;

  date: string;
  colorChanger: string;
  minDate: Date;

  newDate = new Date()

  getDate: Date;

  beforeDifference: any;
  difference: number;


  @Input() todo: Todo;
  @Input() i: number;
  @Output() todoDelete: EventEmitter<Todo> = new EventEmitter();
  @Output() todoCheckbox: EventEmitter<Todo> = new EventEmitter();
  @Output() todoColor: EventEmitter<{ todo: Todo; color: string }> =
    new EventEmitter();
  @Output() todoDate: EventEmitter<Todo> =
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
    this.date = this.todo.date;
    $('#exampleModal' + this.i).modal('show');
  }

  saveDate(todo: Todo) {

    this.getDate = new Date(this.todo.date)

    this.beforeDifference = this.getDate.getTime() - this.newDate.getTime() 

    this.difference = Math.round(Math.abs(this.beforeDifference / (1000 * 3600 * 24)));

    console.log(todo.date)
    this.todoDate.emit(todo);
    this.toastr.success('Changes Successful')

      $("#exampleModal"+this.i).modal('hide');

  }

  

  
}
