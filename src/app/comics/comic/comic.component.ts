import { Component, Inject, inject, Input } from '@angular/core';
import { AppComponent } from '../../app.component';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RecordService } from '../../services/record.service';


@Component({
  selector: 'app-comic',
  imports: [AppComponent, RouterOutlet, CommonModule],
  templateUrl: './comic.component.html',
  styleUrl: './comic.component.css'
})
export class ComicComponent {
  
  recordService = inject(RecordService)
  $records = this.recordService.getRecords();

}
