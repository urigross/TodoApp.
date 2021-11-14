import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {Todo} from 'src/app/models/todo.model';
import {TodoService} from 'src/app/services/todo.service';
import { Location } from '@angular/common';

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
  previousUrl: string='';



  // yoava: bad name, is what shown? isFilterShown
  isAddTodo: boolean = false;
  isEditTodo: boolean = false;

  constructor(private todoService: TodoService, location: Location, router: Router) {
    router.events.subscribe(val=>{
      var urlPath = location.path();
      if(urlPath === '/edit'){
        this.isAddTodo = true;      

      }
      if(urlPath ===''){
        this.isAddTodo = false;
        this.isEditTodo = false;
      }
      // if(urlPath.includes('/edit/')){
      //   this.isEditTodo = true;
      // }
     //TODO: complete if with editable: id with params!
    })
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

  // onIsShown(data: boolean): void {
  //   this.isShown = data;
  //   this.todos$ = this.todoService.query();
  // }
  ngOnInit(): void {
    console.log('todo component on init')
    //this.todos$ = this.todoService.todos$;
    this.todos$ = this.todoService.query();
    //console.log(this.todoService.todos$)
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
