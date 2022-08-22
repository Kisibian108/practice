import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {Todo} from "./todo";
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // constructor(private http:HttpClient) {
  // }
  //
  // getAll(): Observable<Todo[]> {
  //   return this.http.get<Todo[]>(API_URL + '/todos');
  // }
  //
  // saveTodo(todo: any): Observable<Todo> {
  //   return this.http.post<Todo>(API_URL + '/todos', todo);
  // }
  //
  // findById(id: number): Observable<Todo> {
  //   return this.http.get<Todo>(`${API_URL}/todos/${id}`);
  // }
  //
  // updateTodo(id: number, todo: Todo): Observable<Todo> {
  //   return this.http.put<Todo>(`${API_URL}/todos/${id}`, todo);
  // }
  //
  // deleteTodo(id: number): Observable<Todo> {
  //   return this.http.delete<Todo>(`${API_URL}/todos/${id}`);
  // }

  private readonly API_URL = 'http://jsonplaceholder.typicode.com/todos';
  constructor(private http: HttpClient) { }
  getTodos(count = 10): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.API_URL).pipe(
      map(response => response.filter((todo, i) => i < count))
    );
  }
  getTodoById(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.API_URL}/${id}`);
  }
  createTodo(todo: Partial<Todo>): Observable<Todo> {
    return this.http.post<Todo>(this.API_URL, todo);
  }

  deleteTodo(id: number | undefined): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.patch<Todo>(`${this.API_URL}/${todo.id}`, todo);
  }
}
