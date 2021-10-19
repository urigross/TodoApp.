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
  // todos$: Observable<Todo[]>;
  public todos: Todo[];
  subscription: Subscription;
  selectTodoId: string;
  constructor(private todoService: TodoService) { }
  onIdToRemove(data:string){
    this.todoService.remove(data);
  }

  ngOnInit(): void {
    this.subscription = this.todoService.todos$.subscribe(todos => this.todos = todos)
    this.todoService.query();
    // this.todos$ = this.todoService.todos$;


  }
  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

}
