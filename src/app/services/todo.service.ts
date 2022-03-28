import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { FilterBy } from '../models/filterBy.model';
import { SortBy } from '../models/sortBy.model';
import { Todo } from '../models/todo.model';
import { UtilService } from './util.service';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private _defaultTodos: Todo[] = [
    { _id: 'rwr32', title: 'Make a todo app', date: new Date('10/10/2021'), isDone: false, importance: 1, category: 'work' },
    { _id: 'te906', title: 'Go surfing', date: new Date('1/9/2018'), isDone: true, importance: 2, category: 'home' },
    { _id: 'rwras992', title: 'Go on a vication', date: new Date('5/5/2022'), isDone: false, importance: 3, category: 'general' },
    { _id: 'afas22', title: 'Check stocks', date: new Date('5/9/2022'), isDone: false, importance: 3, category: 'home' },
    { _id: 'dklj4665', title: 'Go jogging', date: new Date('5/1/2017'), isDone: false, importance: 3, category: 'home' },
  ]
  // Mock data without categories
  private _TODOS_MOCK_NO_CAT: object[] = [
    { _id: 'rwr32', title: 'Make a todo app', date: new Date('10/10/2021'), isDone: false, importance: 1 },
    { _id: 'te906', title: 'Go surfing', date: new Date('1/9/2018'), isDone: true, importance: 2 },
    { _id: 'rwras992', title: 'Go on a vication', date: new Date('5/5/2022'), isDone: false, importance: 3 },
    { _id: 'afas22', title: 'Check stocks', date: new Date('5/9/2022'), isDone: false, importance: 3, },
    { _id: 'dklj4665', title: 'Go jogging', date: new Date('5/1/2017'), isDone: false, importance: 3 },
  ]
  private _categories: string[] = ['general', 'programming', 'health', 'home', 'today', 'shufersal'];
  private _KEY: string = 'todosDB';
  private _todos$ = new BehaviorSubject<Todo[]>([]);

  // this makes a good separation!
  private todos$ = this._todos$.asObservable();

  // yoava should filterBy$ and sortBy$ be in the service?

  // filter
  private _filterBy$ = new BehaviorSubject<FilterBy>({ term: '', category: '' });
  public filterBy$ = this._filterBy$.asObservable();

  // Sort
  private _sortBy$ = new BehaviorSubject<SortBy>({ term: '', isAscending: true });
  public sortBy$ = this._sortBy$.asObservable();

  constructor() {
  }

  // yoava why public?
  //Query functions
  public query(): Observable<Todo[]> {
    //UtilService.save(this.KEY,TODOS_MOCK_NO_CAT);
    // this._patchDB();
    console.log('Entered query() on todo-service');
    const filterBy = this._filterBy$.getValue();
    const sortBy = this._sortBy$.getValue();
    let todos: Todo[] = UtilService.load(this._KEY);
    console.log('load from local storage to check reading:', UtilService.load(this._KEY));
    console.log('todos on query()', todos);
    console.log('todos.length on query()', todos.length);
    // Add todos to the LS with mock data if it's empty:
    // if (!todos.length) {
    //   this._todos$.next(TODOS);
    //   UtilService.save(this.KEY,TODOS); // Fill LS with mock
    //   //UtilService.save(this.KEY, []);// Set storage to []
    //   // console.log(`Expected results: Storage set with [], Actual results: Storage was set with ${todos}`);
    // }
    if (filterBy && filterBy.term || filterBy.category) {
      console.log('todo service - query() todos when there is valid filter term:', todos);
      todos = this._filter(todos, filterBy.term, filterBy.category);
      console.log('todos after filtering', todos);
    }
    this._todos$.next(this._sort(todos, sortBy))
    return this._todos$;
  }

  //Run once to patch local storage without categories to gereral categories
  // private _patchDB(): void {
  //   // Create backup of data
  //   UtilService.save('todoDB_BACK', UtilService.load(this._KEY));
  //   // Load todosDB from Local storage for patching.
  //   const todos: object[] = UtilService.load(this._KEY);
  //   // Patching todos added 'general' category where key is missing.
  //   var patchedTodos: Todo[] = todos.map((todo: any) => {
  //     let rTodo = todo;
  //     if (rTodo.category === undefined) {
  //       rTodo.category = 'general';
  //     }
  //     return rTodo;
  //   })
  //   //Saving the patched todos
  //   UtilService.save(this._KEY, patchedTodos);
  // }

  getCategories(): string[] {
    return this._categories;
  }

  getFilterCategories(): string[]{
    console.log(this._categories);
    let categories = JSON.parse(JSON.stringify(this._categories));
    categories.unshift('all');
    return categories;
  }

  public getById(id: string): Todo | undefined {
    const todos = this._todos$.getValue();
    return todos.find(todo => todo._id === id);
  }

  getEmptyTodo(): Todo {
    return { _id: '', title: '', date: new Date(), isDone: false, importance: 1, category: 'general' }
  }

  //Action functions
  public remove(todoId: string): void {
    console.log('Entered remove() in todo-service');
    const todos = this._todos$.getValue();
    const todoIdx = todos.findIndex(todo => todo._id === todoId)
    todos.splice(todoIdx, 1);
    this._todos$.next(todos) // update the db after modding.
    UtilService.save(this._KEY, todos);
  }

  public save(todo: Todo): Observable<Todo> {
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
    // If the term is pressed more that once - Change sorting direction
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

  private _add(todo: Todo): Observable<Todo> {
    console.log('entered _add in todo-service')
    const todos = this._todos$.getValue();
    todo._id = UtilService.makeId();
    todos.push(todo);
    UtilService.save(this._KEY, todos);
    console.log('load from local storage to check reading:', UtilService.load(this._KEY))
    this._todos$.next(todos);
    return of(todo);
  }

  private _edit(todo: Todo): Observable<Todo> {
    console.log('entered _edit in todo service')
    const todos = this._todos$.getValue();
    const todoIdx: number = todos.findIndex(_todo => _todo._id === todo._id);
    todos.splice(todoIdx, 1, todo);
    this._todos$.next(todos);
    UtilService.save(this._KEY, todos)
    return of(todo);
  }

  private _filter(todos: Todo[], term: string, category: string): Todo[] {
    term = term.toLocaleLowerCase();
    console.log('todos on _filter()', todos);
    console.log('category on _filter()', category);
    console.log('category on _filter()', category);
    var todoTemp: Todo[] = this._filterByTerm(todos, term)
    console.log('todoTemp', todoTemp);
    return this._filterByCat(todoTemp, category);
  }
  private _filterByTerm(todos: Todo[], term: string): Todo[] {
    return todos.filter(todo => todo.title.toLocaleLowerCase().includes(term))
  }
  private _filterByCat(todos: Todo[], category: string): Todo[] {
    return category ? todos.filter(todo => todo.category === category) : todos;
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

  private _sortByImportance(todos: Todo[], sortBy: SortBy): Todo[] {
    return todos.sort((a, b) => {
      if ((a as any)[sortBy.term] < (b as any)[sortBy.term]) return sortBy.isAscending ? -1 : 1;
      if (a.importance > b.importance) return sortBy.isAscending ? 1 : -1;
      return 0;
    })
  }

  private _sort(todos: Todo[], sortBy: SortBy): Todo[] {
    if (sortBy.term === "title") return this._sortByTitle(todos, sortBy.isAscending)
    if (sortBy.term === "date") return this._sortByNumer(todos, sortBy)
    if (sortBy.term === "isDone") return this._sortByBoolean(todos, sortBy)
    if (sortBy.term === "importance") return this._sortByImportance(todos, sortBy);
    else return this._sortByTitle(todos, sortBy.isAscending);
  }
}
