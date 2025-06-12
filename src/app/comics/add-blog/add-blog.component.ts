import { Component, inject } from '@angular/core';
import { CreateBlogService } from '../../services/create-blog.service';
import { FormsModule } from '@angular/forms';
import { ViewBlogService } from '../../services/view-blog.service';
import { Blog } from '../../models/blog';
import { CommonModule, NgFor } from '@angular/common';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blog',
  imports: [FormsModule, CommonModule, NgFor],
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.css'
})
export class AddBlogComponent implements OnInit {
  titleBlog = "";
  subtitleBlog = "";
  catBlog: string = "Comics";
  bodyBlog = "";
  
  imageFile: File | null = null;
  thumbnailFile: File | null = null;
  
  addBlogService = inject(CreateBlogService);
  viewBlogService = inject(ViewBlogService);
  router = inject(Router);
  
  blogs: Blog[] = [];
  characterCount: number = 0;
  characterCountTitle: number = 0;
  characterCountSubTitle: number = 0;

  updateCharacterCount(): void {
    this.characterCount = this.bodyBlog.length;
  }

  updateCharacterCountTitle(): void {  
    this.characterCountTitle = this.titleBlog.length;
  }

  updateCharacterSubCountTitle(): void {  
    this.characterCountSubTitle = this.subtitleBlog.length;
  }

  constructor() {
    this.loadData();
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.viewBlogService.viewBlog().subscribe((response) => {
      this.blogs = response;
    });
  }

  onFileChange(event: any, type: 'image' | 'thumbnail'): void {
    const file = event.target.files[0];
    if (file) {
      if (type === 'image') {
        this.imageFile = file;
      } else {
        this.thumbnailFile = file;
      }
    }
  }

  addBlog() {
    if (this.imageFile && this.thumbnailFile) {
      const formData = new FormData();
      
      // Append all fields
      formData.append('titleBlog', this.titleBlog);
      formData.append('subtitleBlog', this.subtitleBlog);
      formData.append('catBlog', this.catBlog);
      formData.append('bodyBlog', this.bodyBlog);
      formData.append('image', this.imageFile);
      formData.append('thumbnail', this.thumbnailFile);
  
      this.addBlogService.createBlog(formData).subscribe({
        next: (data) => {
          console.log('Blog created successfully', data);
          this.loadData();
          this.resetForm();
        },
        error: (err) => {
          console.error('Error creating blog', err);
        }
      });
    } else {
      console.error("Both main image and thumbnail are required");
    }
  }

  resetForm(): void {
    this.titleBlog = "";
    this.subtitleBlog = "";
    this.catBlog = "Comics";
    this.bodyBlog = "";
    this.imageFile = null;
    this.thumbnailFile = null;
  }
}