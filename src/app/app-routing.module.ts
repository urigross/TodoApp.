import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoEditComponent } from './cmps/todo-edit/todo-edit.component';
import { AboutComponent } from './pages/about/about.component';
import { TodoComponent } from './pages/todo/todo.component';
import { TodoResolverService } from './services/todo-resolver.service';

const routes: Routes = [
  { path: 'about', component: AboutComponent},
  { path: '', component: TodoComponent,
  children:[
    { path: 'edit/:id', component: TodoEditComponent, resolve: {todo: TodoResolverService}},
    { path: 'edit', component: TodoEditComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
