import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todo-preview',
  templateUrl: './todo-preview.component.html',
  styleUrls: ['./todo-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoPreviewComponent   {

  @Input() todo!: Todo;
  @Output() onIdToRemove = new EventEmitter<string>();
  @Output() onToggleIsDone = new EventEmitter<Todo>();
  errMsg: string = '';
  // FontAwesome icons
  faTrash = faTrash;
  ontoggleCompleted() {
    // toggle the completed todo
    this.todo.isDone = !this.todo.isDone;
    // send the modified todo to the todo-app component.
    this.onToggleIsDone.emit(this.todo);
  }
}
