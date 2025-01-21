import { Component, Inject, inject, Input, NgModule } from '@angular/core';
import { AppComponent } from '../../app.component';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RecordService } from '../../services/record.service';
import { FormsModule } from '@angular/forms';

interface Record{
  artist: string;
  title: string;
  year: string;
  type: string;
}


@Component({
  selector: 'app-comic',
  imports: [CommonModule, FormsModule],
  templateUrl: './comic.component.html',
  styleUrl: './comic.component.css'
})
export class ComicComponent {

  artist = "Michael Jackson";
  title = "Thriller";
  year = "1982";
  type = "LP-7";
  
  recordService = inject(RecordService)
  records:Record[] = [];

  constructor() {
    this.recordService.getRecords().subscribe({
      next: (data) => {
        this.records = data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

    addRecord(){
      this.recordService.createRecord({

        artist: this.artist,
        title: this.title,
        year: this.year,
        type: this.type

      }).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }

}
