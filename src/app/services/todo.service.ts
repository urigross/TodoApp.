import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { FilterBy } from '../models/filterBy.model';
import { SortBy } from '../models/sortBy.model';
import { Todo } from '../models/todo.model';

const TODOS: Todo[] = [
  { _id: 'rwr32', title: 'Make a todo app', date: new Date('10/10/2021'), isDone: false, importance: 1 },
  { _id: 'te906', title: 'Go surfing', date: new Date('1/9/2018'), isDone: true, importance: 2 },
  { _id: 'rwras992', title: 'Go on a vication', date: new Date('5/5/2022'), isDone: false, importance: 3 },
  { _id: 'afas22', title: 'Check stocks', date: new Date('5/9/2022'), isDone: false, importance: 3 },
  { _id: 'dklj4665', title: 'Go jogging', date: new Date('5/1/2017'), isDone: false, importance: 3 },
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
  // Filter 
  private _filterBy$ = new BehaviorSubject<FilterBy>({ term: '' });
  public filterBy$ = this._filterBy$.asObservable();
  // Sort
  private _sortBy$ = new BehaviorSubject<SortBy>({ term: '', isAccending: true });
  public sortBy$ = this._sortBy$.asObservable();

  //Query functions
  public query(): void {
    const filterBy = this._filterBy$.getValue();
    const sortBy = this._sortBy$.getValue();
    let todos: Todo[] = this._todosDB;
    if (filterBy && filterBy.term) {
      todos = this._filter(todos, filterBy.term)
    }
    this._todos$.next(this._sort(todos, sortBy))
  }
  public getById(id: string): Observable<Todo>{
    const todo = this._todosDB.find(todo => todo._id === id);
    return todo ? of(todo) : Observable.throw(`Todo id ${id} was not found.`); 
  }

  getEmptyTodo():Todo{
    return {_id:'', title:'', date: new Date(0) , isDone:false,importance:1}
  }

  //Action functions
  public remove(todoId: string): void {
    const todos = this._todosDB;
    const todoIdx = todos.findIndex(todo => todo._id === todoId)
    todos.splice(todoIdx, 1);
    this._todos$.next(todos) // update the db after modding.
  }

  public save(todo: Todo){
    return todo._id ? this._edit(todo) : this._add(todo);
  }

  private _add(todo: Todo){
    console.log('entered _add')
    todo._id = this._getNewId();
    this._todosDB.push(todo);
    this._todos$.next(this._todosDB);
    return of(todo);
  }

  private _edit(todo: Todo) {
    console.log('entered _edit')
    const todos = this._todosDB;
    const todoIdx:number = todos.findIndex(_todo => _todo._id === todo._id);
    console.log('todoIdx',todoIdx)
    todos.splice(todoIdx,1,todo);
    this._todos$.next(todos);
    return of(todo);
  }

  private _getNewId(length =5):string{
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random()* possible.length));
    }
    return text;
  }



  // Filtering
  public setFilter(filterBy: FilterBy): void {
    this._filterBy$.next(filterBy)
    this.query();
  }
  private _filter(todos: Todo[], term: string) {
    term = term.toLocaleLowerCase();
    return todos.filter(todo => todo.title.toLocaleLowerCase().includes(term))
  }
  // Sorting 
  public setSortBy(term: string, isAccending: boolean): void {
    if (term === "title") {
    }
  }
  public setSort(term: string): void {
    const sortBy: SortBy = this._sortBy$.getValue();
    // If the term is being presses more that once - Change sorting direction
    if (term === sortBy.term) {
      sortBy.isAccending = !sortBy.isAccending;
    }
    //Else - Choose another sorting term
    else {
      sortBy.term = term;
      sortBy.isAccending = true;
    }
    this._sortBy$.next(sortBy);
    this.query();
  }
  private _sortByTitle(todos: Todo[], isAccending: boolean): Todo[] {
    return todos.sort((a, b) => {
      if (a.title.toLocaleLowerCase() < b.title.toLocaleLowerCase()) return isAccending ? -1 : 1;
      if (a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase()) return isAccending ? 1 : -1;
      return 0;
    })
  }
  private _sortByNumer(todos: Todo[], sortBy:SortBy): Todo[] {
    return todos.sort((a, b) => {
      if ((a as any)[sortBy.term] < (b as any)[sortBy.term]) return sortBy.isAccending ? -1 : 1;
      if (a.date > b.date) return sortBy.isAccending ? 1 : -1;
      return 0;
    })
  }
  private _sortByBoolean(todos:Todo[], sortBy:SortBy): Todo[] {
    return todos.sort((a,b)=>{
      return (a.isDone === b.isDone)? 0: a.isDone?  sortBy.isAccending? 1: -1 : sortBy.isAccending? -1 : 1;
    })
  }
  // TODO:learn how to make this more effective
  private _sort(todos: Todo[], sortBy: SortBy): Todo[] {
    if (sortBy.term === "title") return this._sortByTitle(todos, sortBy.isAccending)
    if (sortBy.term === "date") return this._sortByNumer(todos, sortBy)
    if (sortBy.term === "isDone") return this._sortByBoolean(todos, sortBy)    
    else return this._sortByTitle(todos, sortBy.isAccending);
  }
}