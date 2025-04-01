import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Task {
  id: number;
  task_name: string;
  note: string;
  category: 'daily' | 'indoor' | 'outdoor' | 'longterm' | 'bucketlist' | 'coding';
  is_completed: boolean;
  times_completed: number;
  last_completed: string | null;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})

export class TodoService {
  private apiUrl = 'https://back.funkyrobot.ca';
  private http = inject(HttpClient);

  getTasksByCategory(category: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/todos?category=${category}&user_id=1`);
  }

  addTask(task: { task_name: string; note: string; category: string }): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/todos`, {
      ...task,
      user_id: 1
    });
  }

  updateTaskCompletion(id: number, is_completed: boolean): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/todos/${id}`, {
      is_completed,
      times_completed: is_completed ? 'increment' : 'decrement',
      last_completed: is_completed ? new Date().toISOString() : null
    });
  }

  getTimeSinceLastCompleted(lastCompleted: string | null): string {
    if (!lastCompleted) return 'Never completed';
    
    const last = new Date(lastCompleted);
    const now = new Date();
    const diff = now.getTime() - last.getTime();
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return `${days}d ${hours}h`;
  }
}
