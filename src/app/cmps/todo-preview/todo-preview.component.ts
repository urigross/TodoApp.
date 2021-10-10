import { Component, Input, OnInit } from '@angular/core';
import { Todo } from 'src/app/services/todo/todo.model';

@Component({
  selector: 'app-todo-preview',
  templateUrl: './todo-preview.component.html',
  styleUrls: ['./todo-preview.component.scss']
})
export class TodoPreviewComponent implements OnInit {
  @Input() todo:Todo;

  constructor() { }

  ngOnInit(): void {
  }

}
