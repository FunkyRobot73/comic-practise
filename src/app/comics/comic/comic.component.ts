import { Component, Inject, inject, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComicbookService } from '../../services/comicbook.service';



interface Comicbook{
  id:number;
  title: string;
  issue: string;
  type: string;
  year: string;
  publisher:string;
  condition:string;
  key: string;
  description:string;
  short:string;
  characters:number;
  writer: string;
  artist: string;
  image: string;
  value: number;
  slabbed: string;
  createdAt: string;
  isbn: string;
  qty: number;
};

interface Company{
  id: number;
  name: string;
  image: string;
}


@Component({
  selector: 'app-comic',
  imports: [CommonModule, FormsModule],
  templateUrl: './comic.component.html',
  styleUrl: './comic.component.css'
})
export class ComicComponent {

  
  title = "Justice League of America";
  issue = "200";
  type = "TPB";
  year = "1990";
  publisher = "DC";
  condition = "5";
  key = "1st Mister Miracle";
  description = "Amazing Comic";
  short = "Great Story & Art";
  characters = "Batman";
  writer = "Grant Morrison";
  artist = "George Perez";
  image = "dc.webp";
  value = 50;
  slabbed = "Yes";
  createdAt = "";
  isbn = "999-999-001";
  qty = 1;
  addPublisher = "NEW"

  sortPublisher = "IDW"
  
  
  comicbookService = inject(ComicbookService)
  comicbooks:Comicbook[] = [];
  companys:Company[] = [];

  constructor() {
    this.comicbookService.getComics().subscribe({
      next: (data) => {
        this.comicbooks = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.comicbookService.getCompanys().subscribe({
      next: (data) => {
        this.companys = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

    addCompany(){
      this.comicbookService.createCompany(this.addPublisher)
    }

    addComic(){
      this.comicbookService.createComic({

        // artist: this.artist,
        // title: this.title,
        // year: this.year,
        // type: this.type,

        title: this.title,
        issue: this.issue,
        type: this.type,
        year: this.year,
        publisher: this.publisher,
        condition: this.condition,
        key:  this.key,
        description: this.description,
        short: this.short,
        characters: this.characters,
        writer:  this.writer,
        artist:  this.artist,
        image:  this.image,
        value: this.value,
        slabbed:  this.slabbed,
        createdAt:  this.createdAt,
        isbn:  this.isbn,
        qty: this.qty

      }).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        }
      })
    };

    
  

}
