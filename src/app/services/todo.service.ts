import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';


interface Task {
  id: number;
  task_name: string;
  category: 'indoor' | 'outdoor' | 'longterm' | 'bucketlist' | 'coding';
  is_completed: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class TodoService {
  constructor() {}
  
  private apiUrl = 'https://back.funkyrobot.ca';
  http = inject(HttpClient);


  getDailyTasks(): Observable<Task[]> {
      return this.http.get<Task[]>(`${this.apiUrl}/todos`, {
      });
    }

  addDailyTask(taskName: string): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/todos`, {
      task_name: taskName
    }, {
    });
  }

}
