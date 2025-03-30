import { Component, inject, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComicbookService } from '../../services/comicbook.service';
import { CreateComicService } from '../../services/create-comic.service';
import { CreateCompanyService } from '../../services/create-company.service';
import { Router } from '@angular/router';

interface Comicbook{
  id:number;
  title: string;
  issue: string;
  type: string;
  year: string;
  publisher:string;
  condition:string;
  grade: string;
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
    condition = "Excellent Condition Considering it's Age...  Bagged & Boarded.";
    grade = "9";
    key = "1st App. of";
    characters = "Batman";
    writer = "";
    artist = "";
    image = "";
    short:string = "";
    description:string = "";
    value = 20;
    slabbed = "N";
    createdAt = "";
    isbn = "";
    qty = 1;
    
    // addPublisher = "DC"
    sortPublisher = "IDW"

    imageFile:  File | null = null;
    imageName: string ="";  
  
    createComicService = inject(CreateComicService)
    comicbookService = inject(ComicbookService)
    comicbooks:Comicbook[] = [];
    companys:Company[] = [];

  private router = inject(Router);

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
  
  refreshPage() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/addcomic']);
    });
  }



  updateDesc(){
    this.short = this.title + " #" + this.issue + " (" + this.year + ") " + " A Great " + this.type + " by " + this.publisher + " Comics.  Story by " + this.writer + " & Art by " + this.artist + ".";
    this.description = this.title + " #" + this.issue + " (" + this.year + ") " + this.key + "  A cool " + this.type + " by " + this.publisher + " Comics.  Story by " + this.writer + " & Art by " + this.artist + "... with an appearance of " + this.characters + ".  " + this.condition;
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
            this.grade,
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