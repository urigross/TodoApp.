import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FilterBy } from '../models/filterBy.model';
import { Todo } from '../models/todo.model';

const TODOS: Todo[] = [
  {_id: 'rwr32', title: 'Make a todo app', date: new Date('10/10/2021'), isDone: false, importance:1},
  {_id: 'te906', title: 'Go surfing', date: new Date('1/9/2018'), isDone: true, importance:2},
  {_id: 'rwras992', title: 'Go on a vication', date: new Date('5/5/2022'), isDone: false, importance:3},
]

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private _todosDB: Todo[] = TODOS;
  // this is BehiorSubject - we can to .next to him
  private _todos$ = new BehaviorSubject<Todo[]>([])
  // this is an Obrervable - we CANNOT do .next to it but we can do all the other operations 
  // It acts like a getter - You can list to it's changes
  // this makes a good seperation!
  public todos$ = this._todos$.asObservable();

  private _filterBy$ = new BehaviorSubject<FilterBy>({ term: '' });
  public filterBy$ = this._filterBy$.asObservable();


  // public query() {
  //   const filterBy:FilterBy = this._filterBy$.getValue();
  //   const todos = this._todosDB.filter(({ title }) => title.toLowerCase().includes(filterBy.term.toLocaleLowerCase()));
  //   this._todos$.next(todos);
  // }

  public query(){
    const filterBy = this._filterBy$.getValue();
    let todos:Todo[] = this._todosDB;
    if ( filterBy && filterBy.term) {
      todos = this._filter(todos, filterBy.term)
    }
    this._todos$.next(this._sort(todos))
  }

  private _filter(todos:Todo[], term:string){
    term = term.toLocaleLowerCase();
    return todos.filter(todo=> todo.title.toLocaleLowerCase().includes(term))
  }

  private _sort(todos: Todo[]): Todo[]{
    return todos.sort((a,b)=>{
      if(a.title.toLocaleLowerCase() < b.title.toLocaleLowerCase()) return -1;
      if(a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase()) return 1;
      return 0;
    })
  }
  
  public remove(todoId: string):void{
    const todos = this._todosDB;
    const todoIdx = todos.findIndex(todo => todo._id === todoId)
    todos.splice(todoIdx,1);
    this._todos$.next(todos) // update the db after modding.
  }

  public setFilter(filterBy:FilterBy){
    this._filterBy$.next(filterBy)
    this.query();
  }

}