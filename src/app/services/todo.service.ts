import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Task {
  id: number;
  task_name: string;
  note: string;
  category: string;
  is_completed: boolean;
  times_completed: number;
  last_completed: string | null;
  createdAt: string;
  // updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})

export class TodoService {
  private apiUrl = 'https://back.funkyrobot.ca';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

constructor(private http: HttpClient) {}


  getTasksByCategory(category: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/todos?category=${category}&user_id=1`);
  }

  addTask(task: { task_name: string; note: string; category: string }): Observable<Task> {
    const body = {
      ...task,
      user_id: 1, // Your default user
      is_completed: false,
      times_completed: 0
    };

    return this.http.post<Task>(`${this.apiUrl}/todos`, body, {
      headers: this.headers
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

  getElapsedTime(startDate: string | null): { days: number, hours: number, minutes: number } {
    if (!startDate) return { days: 0, hours: 0, minutes: 0 };
    
    const start = new Date(startDate);
    const now = new Date();
    const diff = now.getTime() - start.getTime();
  
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    };
  }
  
}
