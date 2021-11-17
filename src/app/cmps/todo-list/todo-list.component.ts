import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Todo} from 'src/app/models/todo.model';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  @Input() todos!: Todo[] | null;
  // @Input() isEditTodo: boolean = false;
  @Output() onSelectTodo = new EventEmitter<string>();
  @Output() onIdToRemove = new EventEmitter<string>();
  @Output() onToggleIsDone  = new EventEmitter<Todo>();
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todos!, event.previousIndex, event.currentIndex);
  }
  trackByFn(idx: any, todo: Todo) {
    return todo._id;
  }
}
