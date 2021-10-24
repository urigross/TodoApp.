import { Component, Input, OnInit, Output , EventEmitter} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss']
})
export class TodoEditComponent {
  @Input() todo:Todo;
  @Output() onCloseEdit = new EventEmitter<boolean>()
  subscription: Subscription;
  errMsg: string = '';



  constructor(private route: ActivatedRoute, private todoService: TodoService) { }
  async onSave(){
    try {
      await this.todoService.save(this.todo).toPromise()
      this.todo=this.todoService.getEmptyTodo();
      this.onCloseEdit.emit(true);
      // close this input
    } catch (err){
      this.errMsg = err as string;
      console.log(err);
    }
  }
}
