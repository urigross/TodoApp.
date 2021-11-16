import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todo-preview',
  templateUrl: './todo-preview.component.html',
  styleUrls: ['./todo-preview.component.scss']
})
export class TodoPreviewComponent   {

  @Input() todo!: Todo;
  // @Input() isEditTodo:boolean = false; 
  @Output() onIdToRemove = new EventEmitter<string>();
  @Output() onToggleIsDone = new EventEmitter<Todo>();
  errMsg: string = '';
  // FontAwesome icons
  faTrash = faTrash;
  // yoava: better use positive names, double negative is confusing
  // isEditOff: boolean = true;

  // constructor(private todoService: TodoService) {
  // }

  // ngOnInit() {
  //   this.isEditOff = true;
  // }

  // onClickToEdit(): void {
  //   this.isEditOff = false;
  // }

  // onCloseEdit(data: boolean): void {
  //   this.isEditOff = data;
  // }

  ontoggleCompleted() {
    // toggle the completed todo
    this.todo.isDone = !this.todo.isDone;
    // send the modified todo to the todo-app component.
    this.onToggleIsDone.emit(this.todo);
  }



  // async onMarkCompleted() {
  //   this.todo.isDone = !this.todo.isDone;
  //   try {
  //     await this.todoService.save(this.todo).toPromise()
  //   } catch (err) {
  //     this.errMsg = err as string;
  //   }
  // }
}
