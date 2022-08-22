import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'todo'},
  {path: 'todo', component: TodoComponent},


]

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    RouterModule,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
