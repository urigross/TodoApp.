import { Component, EventEmitter,  Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
@Component({
  selector: 'app-todo-preview',
  templateUrl: './todo-preview.component.html',
  styleUrls: ['./todo-preview.component.scss']
})
export class TodoPreviewComponent{

  @Input() todo:Todo;
  @Output() onIdToRemove = new EventEmitter<string>()

  onClickToEdit(){
    console.log(this.todo.title);
  }  
}
