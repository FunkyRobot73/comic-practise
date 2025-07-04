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

interface Company{
  id: number;
  name: string;
  image: string;
};

@Component({
  selector: 'app-comic',
  imports: [CommonModule, FormsModule],
  templateUrl: './comic.component.html',
  styleUrl: './comic.component.css'
})
export class ComicComponent {
  // Form Fields
  title = "";
  issue = "";
  type = "Single Issue";
  year = "";
  publisher = "Marvel";
  condition = "Excellent Condition Considering it's Age...  Bagged & Boarded.";
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
      next: (data) => {
        this.companys = data.sort((a: Company, b: Company): number => {
          const order: string[] = ['All','DC', 'Marvel', 'Image'];
          const indexA: number = order.indexOf(a.name);
          const indexB: number = order.indexOf(b.name);

          if (indexA !== -1 && indexB !== -1) {
            return indexA - indexB;
          } else if (indexA !== -1) {
            return -1;
          } else if (indexB !== -1) {
            return 1;
          } else {
            return a.name.localeCompare(b.name);
          }
        });
      },
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
        // this.refreshPage();
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
    // Handle publisher: Use this.key if publisher is "Other"
    const publisherText = (this.publisher === "Other") ? this.key : this.publisher + " Comics";

    // Handle writer/artist: Combine if they're the same
    const creatorText = (this.writer === this.artist) 
        ? `Story & Art by ${this.writer}`
        : `Story by ${this.writer} & Art by ${this.artist}`;

    // Short description (e.g., for previews)
    this.short = `${this.title} #${this.issue} (${this.year}) A Great ${this.type} by ${publisherText}. ${creatorText}.`;

    // Full description (e.g., for detailed view)
    this.description = `${this.title} #${this.issue} (${this.year}) ${this.key ? this.key + " " : ""}A cool ${this.type} by ${publisherText}. ${creatorText}${this.characters ? "... with an appearance of " + this.characters : ""}. ${this.condition}`;
}

    updateShort() {
    // Handle publisher: Use this.key if publisher is "Other"
    const publisherText = (this.publisher === "Other") ? this.key : this.publisher + " Comics";

    // Handle writer/artist: Combine if they're the same
    const creatorText = (this.writer === this.artist) 
        ? `Story & Art by ${this.writer}`
        : `Story by ${this.writer} & Art by ${this.artist}`;

    // Build the short description
    this.short = `${this.title} #${this.issue} (${this.year}) A Great ${this.type} by ${publisherText}. ${creatorText}.`;
}

  refreshPage() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/addcomic']);
    });
  }
    
  

}
