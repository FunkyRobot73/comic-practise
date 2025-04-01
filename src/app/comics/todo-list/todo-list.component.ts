import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})

export class TodoListComponent implements OnInit {
  daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  currentDayIndex = new Date().getDay();
  
  // Tasks organized by category
  tasks: Record<string, any[]> = {
    daily: [],
    indoor: [],
    outdoor: [],
    longterm: [],
    bucketlist: [],
    coding: []
  };

  newTask = {
    name: '',
    note: '',
    category: 'daily'
  };

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadAllTasks();
  }

  loadAllTasks() {
    Object.keys(this.tasks).forEach(category => {
      this.todoService.getTasksByCategory(category).subscribe(tasks => {
        this.tasks[category] = tasks.map(task => ({
          ...task,
          timeSince: this.todoService.getTimeSinceLastCompleted(task.last_completed)
        }));
      });
    });
  }

  addTask() {
    if (this.newTask.name.trim()) {
      this.todoService.addTask({
        task_name: this.newTask.name,
        note: this.newTask.note,
        category: this.newTask.category
      }).subscribe({
        next: (newTask) => {
          // Add to the correct category array
          this.tasks[newTask.category].push({
            ...newTask,
            timeSince: 'Never completed'
          });
          
          // Reset form
          this.newTask = { name: '', note: '', category: 'daily' };
          
          console.log('Task added successfully:', newTask);
        },
        error: (err) => {
          console.error('Error adding task:', err);
          alert('Failed to add task. Check console for details.');
        }
      });
    }
  }

  toggleTaskCompletion(task: any) {
    const newStatus = !task.is_completed;
    this.todoService.updateTaskCompletion(task.id, newStatus).subscribe(updatedTask => {
      task.is_completed = newStatus;
      task.times_completed = updatedTask.times_completed;
      task.last_completed = updatedTask.last_completed;
      task.timeSince = this.todoService.getTimeSinceLastCompleted(updatedTask.last_completed);
    });
  }

  getCompletedTodayCount() {
    return this.tasks['daily'].filter(t => t.is_completed).length;
  }
}