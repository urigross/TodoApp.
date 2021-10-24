import { Component, EventEmitter,  Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
@Component({
  selector: 'app-todo-preview',
  templateUrl: './todo-preview.component.html',
  styleUrls: ['./todo-preview.component.scss']
})
export class TodoPreviewComponent implements OnInit{

  @Input() todo:Todo;
  @Output() onIdToRemove = new EventEmitter<string>()
  isEditOff:boolean;

  ngOnInit(){
    this.isEditOff = true;

  }

  onClickToEdit(){
    this.isEditOff = false;
  }  

  onCloseEdit(data:boolean){
    this.isEditOff = data;
  }
}
