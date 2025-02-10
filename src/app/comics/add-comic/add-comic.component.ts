import { Component, Inject, inject, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComicbookService } from '../../services/comicbook.service';
import { CreateComicService } from '../../services/create-comic.service';

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

@Component({
  selector: 'app-add-comic',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-comic.component.html',
  styleUrl: './add-comic.component.css'
})
export class AddComicComponent {
  
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
  
    comicbooks:Comicbook[] = [];
    comicbookService = inject(ComicbookService)

  constructor(private createComicService: CreateComicService) {
    
    this.comicbookService.getComics().subscribe({
      next: (data) => {
        this.comicbooks = data;
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
  

    addCompany(){
     
      
      if (this.imageFile) {
        this.createCompanyService.createCompany(          
          this.addPublisher,this.imageFile, this.imageName).subscribe(
            response => {
              console.log("Upload looks Good!!", response);
            },
            error => {
              console.error('Upload failed', error);
            }
          );
        
        } else {
          console.error('No file selected');
        }
    }

    deleteCompany(){};

    
};