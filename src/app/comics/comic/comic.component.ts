import { Component, Inject, inject, Input } from '@angular/core';
import { AppComponent } from '../../app.component';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RecordService } from '../../services/record.service';

interface Record{
  artist: string;
  title: string;
  year: string;
  type: string;
}


@Component({
  selector: 'app-comic',
  imports: [CommonModule],
  templateUrl: './comic.component.html',
  styleUrl: './comic.component.css'
})
export class ComicComponent {
  
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

}
