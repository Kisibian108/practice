import { Component, OnInit } from '@angular/core';
import {Todo} from "../todo";
import {FormControl, FormGroup} from "@angular/forms";
import {TodoService} from "../todo.service";
let _id = 1;
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoList: Todo[] = [];
  inputControl = new FormControl();
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe(next => {
      this.todoList = next;
    }, error => {
      console.log(error);
    }, () => {
      console.log('complete');
    });
  }

  toggleTodo(i: string | number) {
    // @ts-ignore
    const todo = this.todoList[i];
    const todoData = {
      ...todo,
      complete: !todo.complete
    };
    this.todoService.updateTodo(todoData).subscribe(next => {
      // @ts-ignore
      this.todoList[i].complete = next.complete;
    });
  }

  addTodo() {
    const todo: Partial<Todo> = {
      // @ts-ignore
      content: this.inputControl.value,
      complete: false
    };

    this.todoService.createTodo(todo).subscribe(next => {
      this.todoList.unshift(next);
      this.inputControl.setValue('');
    });
  }

  deleteTodo(i: string | number) {
    // @ts-ignore
    const todo = this.todoList[i];
    this.todoService.deleteTodo(todo.id).subscribe(() => {
      this.todoList = this.todoList.filter(t => t.id !== todo.id);
    });
  }
}
