import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComicbookService } from '../../services/comicbook.service';
import { CreateComicService } from '../../services/create-comic.service';
import { Router } from '@angular/router';

interface Comicbook {
  id: number;
  title: string;
  issue: string;
  type: string;
  year: string;
  publisher: string;
  condition: string;
  grade: string;
  key: string;
  description: string;
  short: string;
  characters: string;
  writer: string;
  artist: string;
  image: string;
  value: number;
  slabbed: string;
  isbn: string;
  qty: number;
  volume: string;
}

interface Company {
  id: number;
  name: string;
  image: string;
}

@Component({
  selector: 'app-add-comic',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-comic.component.html',
  styleUrls: ['./add-comic.component.css']
})
export class AddComicComponent {
  // Form Fields
  title = "";
  issue = "";
  type = "Single Issue";
  year = "";
  publisher = "Marvel";
  condition = "";
  grade = "";
  key = "";
  description = "";
  short = "";
  characters = "";
  writer = "";
  artist = "";
  value = 0;
  slabbed = "N";
  isbn = "";
  qty = 1;
  volume = "Vol. 1";

  // addPublisher = "NEW"
  sortPublisher2 = "Marvel"
  
  // Image Handling
  imageFile: File | null = null;
  imageName = "";
  
  // State Management
  editingComicId: number | null = null;
  comicbooks: Comicbook[] = [];
  companys: Company[] = [];

  // Services
  private createComicService = inject(CreateComicService);
  private comicbookService = inject(ComicbookService);
  private router = inject(Router);

  constructor() {
    this.loadComics();
    this.loadCompanies();
  }

  // Data Loading
  loadComics() {
    this.comicbookService.getComics().subscribe({
      next: (data) => this.comicbooks = data,
      error: (err) => console.error('Error loading comics:', err)
    });
  }

  loadCompanies() {
    this.comicbookService.getCompanys().subscribe({
      next: (data) => this.companys = data,
      error: (err) => console.error('Error loading companies:', err)
    });
  }

  // File Handling
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
      this.imageName = file.name;
    }
  }

  // Form Actions
  loadComicForEdit(comic: Comicbook) {
    this.editingComicId = comic.id;
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
    window.scrollTo(0, 0);
  }

  createNewComic() {
    if (!this.imageFile) {
      console.error('No image selected');
      return;
    }

    this.createComicService.createComic(
      this.title, this.issue, this.type, this.year, this.publisher,
      this.condition, this.grade, this.key, this.description, this.short,
      this.characters, this.writer, this.artist, this.value, this.slabbed,
      this.isbn, this.qty, this.volume, this.imageFile, this.imageName
    ).subscribe({
      next: () => this.refreshPage(),
      error: (err) => console.error('Create error:', err)
    });
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

    const update$ = this.imageFile 
      ? this.createComicService.updateComicWithImage(
          this.editingComicId, comicData, this.imageFile, this.imageName)
      : this.createComicService.updateComic(this.editingComicId, comicData);

    update$.subscribe({
      next: () => {
        // this.resetForm();
        this.refreshPage();
      },
      error: (err) => console.error('Update error:', err)
    });
  }

  cancelEdit() {
    this.resetForm();
  }

  resetForm() {
    this.editingComicId = null;
    this.title = "";
    this.issue = "";
    this.type = "Single Issue";
    this.year = "";
    this.publisher = "";
    this.condition = "";
    this.grade = "";
    this.key = "";
    this.description = "";
    this.short = "";
    this.characters = "";
    this.writer = "";
    this.artist = "";
    this.value = 0;
    this.slabbed = "N";
    this.isbn = "";
    this.qty = 1;
    this.volume = "Vol. 1";
    this.imageFile = null;
    this.imageName = "";
  }

  updateDesc() {
    this.short = this.title + " #" + this.issue + " (" + this.year + ") " + " A Great " + this.type + " by " + this.publisher + " Comics. Story by " + this.writer + " & Art by " + this.artist + ".";
    this.description = this.title + " #" + this.issue + " (" + this.year + ") " + this.key + " A cool " + this.type + " by " + this.publisher + " Comics. Story by " + this.writer + " & Art by " + this.artist + "... with an appearance of " + this.characters + ". " + this.condition;
    }

    updateShort() {
      this.short = this.title + " #" + this.issue + " (" + this.year + ") " + " A Great " + this.type + " by " + this.publisher + " Comics. Story by " + this.writer + " & Art by " + this.artist + ".";
      this.description = this.title + " #" + this.issue + " (" + this.year + ") " + this.key + " A cool " + this.type + " by " + this.publisher + " Comics. Story by " + this.writer + " & Art by " + this.artist + "... with an appearance of " + this.characters + ". " + this.condition;
      }

  refreshPage() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/addcomic']);
    });
  }

  
}