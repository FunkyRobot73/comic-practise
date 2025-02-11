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
  
    title = "Justice League America";
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
    image = "";
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