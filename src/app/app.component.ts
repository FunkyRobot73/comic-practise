import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularComponent } from "./angular/angular/angular.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'comic-practice';
  JLA = ["batman", "superman", "flash"]
}
