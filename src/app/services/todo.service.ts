import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { FilterBy } from '../models/filterBy.model';
import { SortBy } from '../models/sortBy.model';
import { Todo } from '../models/todo.model';
import { utilService } from './util.service';

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
  // this is BehaviorSubject - Can get .next and getValue()
  private KEY: string = 'todosDB';
  private _todos$ = new BehaviorSubject<Todo[]>([]);

  // this is an Observable - we CANNOT do .next.
  // It acts like a getter - You can list to it's changes
  // this makes a good separation!
  public todos$ = this._todos$.asObservable();

  // yoava should filterBy$ and sortBy$ be in the service?

  // filter
  private _filterBy$ = new BehaviorSubject<FilterBy>({ term: '' });
  public filterBy$ = this._filterBy$.asObservable();

  // Sort
  private _sortBy$ = new BehaviorSubject<SortBy>({ term: '', isAscending: true });
  public sortBy$ = this._sortBy$.asObservable();

  constructor() {
  }

  // yoava why public?
  //Query functions
  public query(): Observable<Todo[]> {
    console.log('Entered query() on todo-service');
    const filterBy = this._filterBy$.getValue();
    const sortBy = this._sortBy$.getValue();
    let todos = utilService.load(this.KEY);
    console.log('load from local storage to check reading:', utilService.load(this.KEY));
    console.log('todos on query()', todos);
    console.log('todos.length on query()', todos.length);
    if (!todos.length) {
      this._todos$.next(TODOS);
      utilService.save(this.KEY, todos);// Set storage to []
      console.log(`Expected results: Storage set with [], Actual results: Storage was set with ${todos}`);
    }
    if (filterBy && filterBy.term) {
      todos = this._filter(todos, filterBy.term)
    }
    this._todos$.next(this._sort(todos, sortBy))
    return this._todos$;
  }

  public getById(id: string): Todo | undefined {
    const todos = this._todos$.getValue();
    return todos.find(todo => todo._id === id);
  }

  getEmptyTodo(): Todo {
    return { _id: '', title: '', date: new Date(0), isDone: false, importance: 1 }
  }

  //Action functions
  public remove(todoId: string): void {
    console.log('Entered remove() in todo-service');
    const todos = this._todos$.getValue();
    const todoIdx = todos.findIndex(todo => todo._id === todoId)
    todos.splice(todoIdx, 1);
    this._todos$.next(todos) // update the db after modding.
    utilService.save(this.KEY, todos);
  }

  public save(todo: Todo) {
    return todo._id ? this._edit(todo) : this._add(todo);
  }

  // Filtering
  public setFilter(filterBy: FilterBy): void {
    this._filterBy$.next(filterBy)
    this.query();
  }

  // Sorting
  public setSortBy(term: string, isAscending: boolean): void {
    if (term === "title") {
    }
  }

  public setSort(term: string): void {
    const sortBy: SortBy = this._sortBy$.getValue();
    // If the term is being presses more that once - Change sorting direction
    if (term === sortBy.term) {
      sortBy.isAscending = !sortBy.isAscending;
    }
    //Else - Choose another sorting term
    else {
      sortBy.term = term;
      sortBy.isAscending = true;
    }
    this._sortBy$.next(sortBy);
    this.query();
  }

  private _add(todo: Todo) {
    console.log('entered _add in todo-service')
    const todos = this._todos$.getValue();
    todo._id = utilService.makeId();
    todos.push(todo);
    utilService.save(this.KEY, todos);
    console.log('load from local storage to check reading:', utilService.load(this.KEY))
    this._todos$.next(todos);
    return of(todo);
  }

  private _edit(todo: Todo) {
    console.log('entered _edit in todo service')
    const todos = this._todos$.getValue();
    const todoIdx: number = todos.findIndex(_todo => _todo._id === todo._id);
    todos.splice(todoIdx, 1, todo);
    this._todos$.next(todos);
    utilService.save(this.KEY, todos)
    return of(todo);
  }

  private _filter(todos: Todo[], term: string) {
    term = term.toLocaleLowerCase();
    return todos.filter(todo => todo.title.toLocaleLowerCase().includes(term))
  }

  private _sortByTitle(todos: Todo[], isAscending: boolean): Todo[] {
    return todos.sort((a, b) => {
      if (a.title.toLocaleLowerCase() < b.title.toLocaleLowerCase()) return isAscending ? -1 : 1;
      if (a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase()) return isAscending ? 1 : -1;
      return 0;
    })
  }

  private _sortByNumer(todos: Todo[], sortBy: SortBy): Todo[] {
    return todos.sort((a, b) => {
      if ((a as any)[sortBy.term] < (b as any)[sortBy.term]) return sortBy.isAscending ? -1 : 1;
      if (a.date > b.date) return sortBy.isAscending ? 1 : -1;
      return 0;
    })
  }

  private _sortByBoolean(todos: Todo[], sortBy: SortBy): Todo[] {
    return todos.sort((a, b) => {
      return (a.isDone === b.isDone) ? 0 : a.isDone ? sortBy.isAscending ? 1 : -1 : sortBy.isAscending ? -1 : 1;
    })
  }

  // TODO:learn how to make this more effective
  private _sort(todos: Todo[], sortBy: SortBy): Todo[] {
    if (sortBy.term === "title") return this._sortByTitle(todos, sortBy.isAscending)
    if (sortBy.term === "date") return this._sortByNumer(todos, sortBy)
    if (sortBy.term === "isDone") return this._sortByBoolean(todos, sortBy)
    else return this._sortByTitle(todos, sortBy.isAscending);
  }
}
