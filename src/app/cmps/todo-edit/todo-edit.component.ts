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
  @Input() todo!:Todo;
  @Input() ngValue:any;
  @Output() onCloseEdit = new EventEmitter<boolean>()
  @Output() isShown = new EventEmitter<boolean>()
  subscription!: Subscription;
  errMsg: string = '';



  constructor(private route: ActivatedRoute, private todoService: TodoService) { }
  async onSave(){
    try {
      console.log('todo before save',this.todo);
      await this.todoService.save(this.todo).toPromise()
      this.todo=this.todoService.getEmptyTodo();
      console.log(this.todo);
      this.onCloseEdit.emit(true);
      this.isShown.emit(true);
      // close this input
    } catch (err){
      this.errMsg = err as string;
      console.log(err);
    }
  }
}
