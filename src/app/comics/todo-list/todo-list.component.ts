import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})

export class TodoListComponent implements OnInit, OnDestroy {
  daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  currentDayIndex = new Date().getDay();
  private refreshInterval$ = interval(60000); // Update every minute
  private subscription: Subscription = new Subscription();

  
  // Tasks organized by category
  tasks: Record<string, any[]> = {
    daily: [],
    indoor: [],
    outdoor: [],
    longterm: [],
    bucketlist: [],
    coding: [],
    garagesale: [],
    media: [],
    purchase: [],
    done: []
    
  };

  newTask = {
    name: '',
    note: '',
    category: 'daily'
  };

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadAllTasks();
    this.loadAllTasks();
    this.subscription = this.refreshInterval$.subscribe(() => {
      this.updateElapsedTimes();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadAllTasks() {
    Object.keys(this.tasks).forEach(category => {
      this.todoService.getTasksByCategory(category).subscribe(tasks => {
        this.tasks[category] = tasks.map(task => ({
          ...task,
          createdAgo: this.todoService.getElapsedTime(task.createdAt),
          completedAgo: this.todoService.getElapsedTime(task.last_completed)
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

  updateElapsedTimes() {
    Object.keys(this.tasks).forEach(category => {
      this.tasks[category] = this.tasks[category].map(task => ({
        ...task,
        createdAgo: this.todoService.getElapsedTime(task.createdAt),
        completedAgo: this.todoService.getElapsedTime(task.last_completed)
      }));
    });
  }

  // Add these methods to your TodoListComponent class

completeTask(task: any) {
  this.todoService.updateTaskCompletion(task.id, true).subscribe({
    next: (updatedTask) => {
      task.is_completed = true;
      task.times_completed = updatedTask.times_completed;
      task.last_completed = updatedTask.last_completed;
      task.completedAgo = this.todoService.getElapsedTime(updatedTask.last_completed);
    },
    error: (err) => {
      console.error('Error completing task:', err);
    }
  });
}

incrementTask(task: any) {
  this.todoService.incrementTaskCompletion(task.id).subscribe({
    next: (updatedTask) => {
      task.times_completed = updatedTask.times_completed;
      task.last_completed = updatedTask.last_completed;
      task.is_completed = true;
      task.completedAgo = this.todoService.getElapsedTime(updatedTask.last_completed);
    },
    error: (err) => {
      console.error('Error incrementing task:', err);
      // Optional: Show error to user
    }
  });
}
markTaskDone(task: any, currentCategory: string) {
  this.todoService.markTaskDone(task.id).subscribe({
    next: (updatedTask) => {
      // Remove from current category
      this.tasks[currentCategory] = this.tasks[currentCategory].filter(t => t.id !== task.id);
      
      // Add to done category if it exists
      if (this.tasks['done']) {
        updatedTask.completedAgo = this.todoService.getElapsedTime(updatedTask.last_completed);
        this.tasks['done'].push(updatedTask);
      }
      
      console.log('Task marked as done:', updatedTask);
    },
    error: (err) => {
      console.error('Error marking task as done:', err);
    }
  });
}

markTaskUndone(task: any, currentCategory: string) {
  this.todoService.updateTaskCompletion(task.id, false).subscribe({
    next: (updatedTask) => {
      // Remove from done category
      this.tasks['done'] = this.tasks['done'].filter(t => t.id !== task.id);
      
      // Add back to the original category
      if (this.tasks[currentCategory]) {
        updatedTask.completedAgo = null; // Reset completed time
        this.tasks[currentCategory].push(updatedTask);
      }
      
      console.log('Task marked as undone:', updatedTask);
    },
    error: (err) => {
      console.error('Error marking task as undone:', err);
    }
  });
}
}