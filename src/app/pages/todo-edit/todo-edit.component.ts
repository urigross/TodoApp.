import { ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
// Services
import { TodoService } from 'src/app/services/todo.service';
import { UtilService } from 'src/app/services/util.service';
// Fontawesome
import { faWindowClose } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoEditComponent implements OnInit {
  constructor(private route: ActivatedRoute, private todoService: TodoService, private router: Router) { }
  //TODO: change this to initilize without empty todo
  todo: Todo = this.todoService.getEmptyTodo();
  subscription!: Subscription;
  errMsg: string ='';
  selectedImortancy=1;
  importanceArr:number[] = UtilService.getImportancyArray(10);
  categories:string[] = this.todoService.getCategories();
  // FontAwesome icons
  faWindowClose = faWindowClose;

  @Input() ngValue: any; // Form option tag value

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(data => {
      this.todo = data.todo || this.todoService.getEmptyTodo();
    })
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  async onSave(){
    try{
      await this.todoService.save(this.todo).toPromise();
      this.router.navigateByUrl('/')
    } catch (err){
      this.errMsg = err as string;
      console.log(err);
    }
  }
}



