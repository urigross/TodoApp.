import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/services/todo/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  x = '';
  todos: Todo[] = [{
    _id:'rwr32',
    title: 'Make a todo app',
    date: new Date('10/10/2021'),
    isDone: false,
  },
  {
    _id:'te906',
    title: 'Go surfing',
    date: new Date('1/9/2018'),
    isDone: true,
  },
  {
    _id:'rwr32',
    title: 'Go on a vication',
    date: new Date('5/5/2022'),
    isDone: false,
  },
]

  constructor() { }

  ngOnInit(): void {
    this.x='1';
  }

}
