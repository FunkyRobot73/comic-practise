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
  currentDayIndex = new Date().getDay(); // 0-6 where 0 is Sunday

  // Daily tasks with completion tracking
dailyTasks: any[] = [];
categorizedTasks: { [key in 'indoor' | 'outdoor' | 'longTerm']: string[] } = {
  indoor: [],
  outdoor: [],
  longTerm: []
};

// Today's Date
today: string = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});


// Track new task input
newTask = {
  indoor: '',
  outdoor: '',
  longTerm: ''
};

constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.todoService.getDailyTasks().subscribe(tasks => {
      this.dailyTasks = tasks;
    });
    
    // Load categorized tasks similarly
  }

  addDailyTask(taskName: string) {
    this.todoService.addDailyTask(taskName).subscribe(newTask => {
      this.dailyTasks.push(newTask);
    });
  }

  updateTaskCompletion(task: any) {
    // Call API to update completion status
  }

// Add a new task to a category
addTask(category: 'indoor' | 'outdoor' | 'longTerm') {
  if (this.newTask[category].trim()) {
    this.categorizedTasks[category].push(this.newTask[category].trim());
    this.newTask[category] = '';
  }
}

// Remove a task from a category
removeTask(category: 'indoor' | 'outdoor' | 'longTerm', index: number) {
  this.categorizedTasks[category].splice(index, 1);
}

// Reset daily tasks (could be called at start of new day)
resetDailyTasks() {
  this.dailyTasks.forEach(task => task.completed = false);
}
}
