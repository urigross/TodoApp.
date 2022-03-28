import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { TodoService } from './todo.service';

@Injectable({
  providedIn: 'root'
})
export class TodoResolverService implements Resolve<any> {
  
  constructor(private todoService: TodoService) { }

  resolve(route: ActivatedRouteSnapshot){
    const {id} = route.params
    return this.todoService.getById(id);
  }
}
