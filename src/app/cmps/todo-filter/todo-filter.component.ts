import {ChangeDetectionStrategy, Component, OnInit, Input} from '@angular/core';
import {Subscription} from 'rxjs';
import {FilterBy} from 'src/app/models/filterBy.model';
import {TodoService} from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoFilterComponent implements OnInit {
  
  public filterBy: FilterBy = {term:'', category:''};
  private subscription!: Subscription;
  public categories: string[] = ['All','general','home','work'];
  
  
  constructor(private todoService: TodoService) {
  }
  
  //
  onSetFilter(): void {
    console.log('setfilterby:',this.filterBy)
    this.todoService.setFilter(this.filterBy)
  }

  ngOnInit(): void {
    this.subscription = this.todoService.filterBy$.subscribe(filterBy => {
      this.filterBy = filterBy;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
