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
  subtitleBlog01 = "";
  subtitleBlog02 = "";
  subtitleBlog03 = "";
  subtitleBlog04 = ""; 
  subtitleBlog05 = "";
  catBlog: string = "Comics";
  bodyBlog01 = "";
  bodyBlog02 = "";
  bodyBlog03 = "";
  bodyBlog04 = "";
  bodyBlog05 = "";
  
  imageFile: File | null = null;
  thumbnailFile: File | null = null;
  
  addBlogService = inject(CreateBlogService);
  viewBlogService = inject(ViewBlogService);
  router = inject(Router);
  
  blogs: Blog[] = [];
  characterCount: number = 0;
  characterCount02: number = 0;
  characterCountTitle: number = 0;
  characterCountSubTitle01: number = 0;
  characterCountSubTitle02: number = 0;
  characterCountSubTitle03: number = 0;
  characterCountSubTitle04: number = 0;
  characterCountSubTitle05: number = 0;

  updateCharacterCount(): void {
    this.characterCount = this.bodyBlog01.length;
  }

  updateCharacterCount02(): void {
    this.characterCount02 = this.bodyBlog02.length;
  }

  updateCharacterCountTitle(): void {  
    this.characterCountTitle = this.titleBlog.length;
  }

  

  updateCharacterCountSubTitle(index: number): void {
    switch (index) {
      case 1:
        this.characterCountSubTitle01 = this.subtitleBlog01.length;
        break;
      case 2:
        this.characterCountSubTitle02 = this.subtitleBlog02.length;
        break;
      case 3:
        this.characterCountSubTitle03 = this.subtitleBlog03.length;
        break;
      case 4:
        this.characterCountSubTitle04 = this.subtitleBlog04.length;
        break;
      case 5:
        this.characterCountSubTitle05 = this.subtitleBlog05.length;
        break;
    }
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
      formData.append('subtitleBlog', this.subtitleBlog01);
      formData.append('subtitleBlog02', this.subtitleBlog02);
      formData.append('subtitleBlog03', this.subtitleBlog03);
      formData.append('subtitleBlog04', this.subtitleBlog04);
      formData.append('subtitleBlog05', this.subtitleBlog05);

      formData.append('catBlog', this.catBlog);
      formData.append('bodyBlog', this.bodyBlog01);
      formData.append('bodyBlog02', this.bodyBlog02);
      formData.append('bodyBlog03', this.bodyBlog03);
      formData.append('bodyBlog04', this.bodyBlog04);
      formData.append('bodyBlog05', this.bodyBlog05);
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
    this.subtitleBlog01 = "";
    this.catBlog = "Comics";
    this.bodyBlog01 = "";
    this.imageFile = null;
    this.thumbnailFile = null;
  }
}