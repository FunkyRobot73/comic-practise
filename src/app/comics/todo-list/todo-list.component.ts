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

// Categorized tasks
categorizedTasks = {
  indoor: [
    'To Do List',
    'BJ Hat',
    'Adele Decals',
    'Adele 2021 Video',
    'MAC/Virtual DJ',
    'Adele 2023 Video',
    'Scan Blue Binder',
    'Put Essentials in Box'
  ],
  outdoor: [
    'Gate (Neighbour)',
    'Tania\'s power Bar',
    'Garage Insulation'
  ],
  longTerm: [
    'Facebook',
    'Google',
    'ThePhotoBooth.ca',
    '260',
    '26',
    'HamiltonPartyIdeas',
    '83',
    '33',
    'Posts',
    'F\'ers',
    '+ F\'ing',
    'MARKETPLACE',
    '100',
    '@6ixbooth',
    '@hamiltonpartyideas',
    '@geek2go'
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
