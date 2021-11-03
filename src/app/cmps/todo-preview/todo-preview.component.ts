import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-preview',
  templateUrl: './todo-preview.component.html',
  styleUrls: ['./todo-preview.component.scss']
})
export class TodoPreviewComponent implements OnInit {

  @Input() todo: Todo;

  @Output() onIdToRemove = new EventEmitter<string>();
  @Output() onToggleIsDone = new EventEmitter<Todo>();

  // yoava: better use positive names, double negative is confusing
  isEditOff: boolean;
  errMsg: string = '';

  // constructor(private todoService: TodoService) {
  // }

  ngOnInit() {
    this.isEditOff = true;
  }

  onClickToEdit(): void {
    this.isEditOff = false;
  }

  onCloseEdit(data: boolean): void {
    this.isEditOff = data;
  }

  onToggleCompleted() {
    this.todo.isDone = !this.todo.isDone;
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
