import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss']
})
export class TodoEditComponent implements OnInit {
  todo: Todo = this.todoService.getEmptyTodo();
  subscription!: Subscription;
  errMsg: string = '';

  //@Input() todo!:Todo;
  @Input() ngValue: any; // Form option tag value
 // @Output() onCloseEdit = new EventEmitter<boolean>()
 // @Output() isShown = new EventEmitter<boolean>()



  constructor(private route: ActivatedRoute, private todoService: TodoService, private router: Router) { }
  async onSave() {
    try {
      console.log('Entered todo onSave() in edit component', this.todo);
      await this.todoService.save(this.todo).toPromise();
      this.todo = this.todoService.getEmptyTodo();
      console.log('this.todo on onSave()', this.todo);
     // this.onCloseEdit.emit(true);
      //this.isShown.emit(true);
      // close this input
      this.router.navigateByUrl('/');
    } catch (err) {
      this.errMsg = err as string;
      console.log(err);
    }
  }

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(data => {
      this.todo = data.todo || this.todoService.getEmptyTodo()
    })
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}

