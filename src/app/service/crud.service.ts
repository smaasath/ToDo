import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task, TaskData } from '../model/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  // API URL
  private baseUrl = 'https://60a21a08745cd70017576014.mockapi.io/api/v1';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + '/todo');
  }

  addTask(task: TaskData): Observable<TaskData> {
    return this.http.post<TaskData>(this.baseUrl + '/todo', task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.baseUrl + '/todo/' + task.id, task);
  }

  deleteTask(task: Task): Observable<Task> {
    return this.http.delete<Task>(this.baseUrl + '/todo/' + task.id);
  }
}
