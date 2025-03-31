import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {

  daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  currentDayIndex = new Date().getDay(); // 0-6 where 0 is Sunday
// Daily tasks with completion tracking
dailyTasks = [
  { name: 'Daily House', completed: false },
  { name: 'Exercise', completed: false },
  { name: 'Canva', completed: false },
  { name: 'Indeed', completed: false },
  { name: 'Post Marketplace', completed: false },
  { name: 'Post Comic', completed: false },
  { name: 'Hpi & Geek2Go', completed: false },
  { name: 'Read a Chapter', completed: false },
  { name: 'Draw Something', completed: false },
  { name: 'Chess', completed: false },
  { name: 'Udemy!', completed: false }
];

// Today's Date
today: string = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

// Categorized tasks
categorizedTasks = {
  indoor: [
    'Blue Jays Hat',
    'Adele Decals',
    'Adele 2021 Video',
    'MAC/Virtual DJ',
    'Adele 2023 Video',
    'Tania\'s power Bar',
    'Scan Blue Binder',
  ],
  outdoor: [
    'Gate (Neighbour)',
    'Garage Insulation'
  ],
  longTerm: [
    'Marketplace 100',
    'Google',
    'ThePhotoBooth.ca',
    'HamiltonPartyIdeas',
    
  ]
};

// Track new task input
newTask = {
  indoor: '',
  outdoor: '',
  longTerm: ''
};

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
