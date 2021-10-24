import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todos$: Observable<Todo[]>;
  subscription: Subscription;

  constructor(private todoService: TodoService) { }

  onIdToRemove(data: string): void {
    this.todoService.remove(data);
  }
  onToggleSort(term: string): void {
    this.todoService.setSort(term);
  }
  ngOnInit(): void {
    this.todoService.query();
    this.todos$ = this.todoService.todos$;

    
  }
}
