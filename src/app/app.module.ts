import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './pages/todo/todo.component';
import { HeaderComponent } from './cmps/header/header.component';
import { TodoListComponent } from './cmps/todo-list/todo-list.component';
import { TodoPreviewComponent } from './cmps/todo-preview/todo-preview.component';
import { TodoFilterComponent } from './cmps/todo-filter/todo-filter.component';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './pages/about/about.component';
import { TodoEditComponent } from './pages/todo-edit/todo-edit.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { DateDescPipe } from './pipes/date-desc.pipe';
import { InputBackclrDirective } from './directives/input-backclr.directive';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoEditComponent,
    HeaderComponent,
    TodoListComponent,
    TodoPreviewComponent,
    TodoFilterComponent,
    AboutComponent,
    DateDescPipe,
    InputBackclrDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
