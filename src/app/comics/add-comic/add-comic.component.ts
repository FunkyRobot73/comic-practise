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
  volume: string;
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
    volume = "Vol. 1"
    
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
  
  // Add this method to your component class
loadComicForEdit(comic: Comicbook) {
  // Load all comic data into the form fields
  this.title = comic.title;
  this.issue = comic.issue;
  this.type = comic.type;
  this.year = comic.year;
  this.publisher = comic.publisher;
  this.condition = comic.condition;
  this.grade = comic.grade;
  this.key = comic.key;
  this.description = comic.description;
  this.short = comic.short;
  this.characters = comic.characters;
  this.writer = comic.writer;
  this.artist = comic.artist;
  this.value = comic.value;
  this.slabbed = comic.slabbed;
  this.isbn = comic.isbn;
  this.qty = comic.qty;
  this.volume = comic.volume;
  
  // Store the comic ID for updating
  this.editingComicId = comic.id;
  
  // Scroll to the top of the form
  window.scrollTo(0, 0);
}

// Add this property to your component class
editingComicId: number | null = null;

addComic() {
  if (this.editingComicId) {
    this.updateComic();
  } else {
    this.createNewComic();
  }
}
// Add these new methods
createNewComic() {
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
      this.isbn,
      this.qty,
      this.volume,
      this.imageFile,
      this.imageName,
    ).subscribe({
      next: (data) => {
        console.log(data);
        this.refreshPage();
      },
      error: (err) => {
        console.log(err);
      }
    });
  } else {
    console.error('No file selected');
  }
}

updateComic() {
  if (!this.editingComicId) return;

  const comicData = {
    title: this.title,
    issue: this.issue,
    type: this.type,
    year: this.year,
    publisher: this.publisher,
    condition: this.condition,
    grade: this.grade,
    key: this.key,
    description: this.description,
    short: this.short,
    characters: this.characters,
    writer: this.writer,
    artist: this.artist,
    value: this.value,
    slabbed: this.slabbed,
    isbn: this.isbn,
    qty: this.qty,
    volume: this.volume
  };

  if (this.imageFile) {
    // If a new image is provided, include it in the update
    this.createComicService.updateComicWithImage(
      this.editingComicId,
      comicData,
      this.imageFile,
      this.imageName
    ).subscribe({
      next: (data) => {
        console.log(data);
        this.editingComicId = null;
        this.refreshPage();
      },
      error: (err) => {
        console.log(err);
      }
    });
  } else {
    // If no new image, just update the other fields
    this.createComicService.updateComic(
      this.editingComicId,
      comicData
    ).subscribe({
      next: (data) => {
        console.log(data);
        this.editingComicId = null;
        this.refreshPage();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
cancelEdit() {
  this.editingComicId = null;
  // Reset form or clear fields as needed
  this.refreshPage();
}

    deleteCompany(){};

    
    
};