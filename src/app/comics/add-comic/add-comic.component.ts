import { Component, Inject, inject, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComicbookService } from '../../services/comicbook.service';
import { ImageUploadService } from '../../services/image-upload.service';

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
  
  addPublisher = "NEW"
  image = "";

  selectedFile: File | null = null;
  uploadStatus: string | null = null;
  
  
  comicbookService = inject(ComicbookService)
  
  companys:Company[] = [];

  constructor(private imageUploadService: ImageUploadService) {
    
    this.comicbookService.getCompanys().subscribe({
      next: (data) => {
        this.companys = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  };

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.imageUploadService.uploadImage(this.selectedFile).subscribe({
        next: (response) => (this.uploadStatus = 'Upload successful!'),
        error: (err) => (this.uploadStatus = 'Upload failed. Please try again.'),
      });
    }
  }

    addCompany(){
      this.comicbookService.createCompany(this.addPublisher, this.image)
    };

    deleteCompany(){};

    
};