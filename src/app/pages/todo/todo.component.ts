import {Component, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Todo} from 'src/app/models/todo.model';
import {TodoService} from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todos$!: Observable<Todo[]>;
  subscription!: Subscription;
  emptyTodo!: Todo;
  errMsg: string = '';


  // yoava: bad name, is what shown? isFilterShown
  isShown: boolean = true;

  constructor(private todoService: TodoService) {
  }

  onIdToRemove(data: string): void {
    this.todoService.remove(data);
  }

  onToggleSort(term: string): void {
    this.todoService.setSort(term);
  }

  onToggleIsDone(data: Todo):void{
    this._saveTodo(data);
    
  }

  onIsShown(data: boolean): void {
    this.isShown = data;
    this.todos$ = this.todoService.query();
  }
  ngOnInit(): void {
    // this.todos$ = this.todoService.todos$;
    this.todos$ = this.todoService.query();
    // console.log(this.todoService.todos$)
    this.loadEmptyTodo();
  }

  loadEmptyTodo(): void {
    this.emptyTodo = this.todoService.getEmptyTodo();
  }
  private async _saveTodo(todo:Todo){
    try {
      await this.todoService.save(todo).toPromise();
    }
    catch (err){
      this.errMsg = err as string;
      console.log(err);
    }
  }
}
