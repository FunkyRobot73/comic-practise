import { Component, Inject, inject, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComicbookService } from '../../services/comicbook.service';
import { CreateComicService } from '../../services/create-comic.service';
import { CreateCompanyService } from '../../services/create-company.service';

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
  characters:string;
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
  selector: 'app-add-comic',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-comic.component.html',
  styleUrl: './add-comic.component.css'
})
export class AddComicComponent {
  
    title = "Justice League Quarterly";
    issue = "1";
    type = "Single Issue";
    year = "1990";
    publisher = "DC";
    condition = "8";
    key = "1st App. of";
    characters = "Batman";
    writer = "";
    artist = "";
    image = "";
    short:string = "";
    description:string = "";
    value = 59;
    slabbed = "N";
    createdAt = "";
    isbn = "999-999-001";
    qty = 1;
    
    // addPublisher = "DC"
    sortPublisher = "IDW"

    imageFile:  File | null = null;
    imageName: string ="";  
  
    createComicService = inject(CreateComicService)
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

  };

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
      this.imageName = file.name;
    }
  }

  updateDesc(){
    this.short = this.title + " #" + this.issue + " (" + this.key + ") " + " is an Amazing " + this.type + " by " + this.publisher + " Comics.  Written by " + this.writer + " & Art by " + this.artist + "... with an appearance of " + this.characters + ".";
    this.description = this.title + " is an Amazing " + this.type + " by " + this.publisher + " Comics.  Written by " + this.writer + " & Art by " + this.artist + "... with an appearance of " + this.characters + ".  Excellent Condition (" + this.condition + " out of 10) for it's age (" + this.year + ").  Bagged & Boarded.";
  };
  

    addComic(){
     
      
      if (this.imageFile) {
        this.createComicService.createComic(  
          
            this.title,
            this.issue,
            this.type,
            this.year,
            this.publisher,
            this.condition,
            this.key,
            this.description,
            this.short,
            this.characters,
            this.writer,
            this.artist,
            this.value,
            this.slabbed,
            // this.createdAt,
            this.isbn,
            this.qty,
            
        //  here!!!
            this.imageFile,
            this.imageName,
          ).subscribe({
            next: (data) => {
              console.log(data);
            },
            error: (err) => {
              console.log(err);
            }
          }
          );
        
        } else {
          console.error('No file selected');
        }
    }

    deleteCompany(){};

    
    
};