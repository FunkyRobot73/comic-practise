import { Component, inject } from '@angular/core';
import { CreateBlogService } from '../../services/create-blog.service';
import { FormsModule } from '@angular/forms';
import { ViewBlogService } from '../../services/view-blog.service';
import { Blog } from '../../models/blog';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-add-blog',
  imports: [FormsModule, CommonModule, NgFor],
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.css'
})
export class AddBlogComponent {
  titleBlog : string = "Just Read";
  catBlog : string = "Music";
  bodyBlog : string = "1st App. of Batman";
  imageBlog : string = "";
  imageThumbBlog : string = "";

  imageFile:  File | null = null;
  imageName: string ="";  
    
  
  addBlogService = inject(CreateBlogService);
  viewBlogService = inject(ViewBlogService);
  blogs: Blog[] = [];

  constructor() {

    this.viewBlogService.viewBlog().subscribe({
      next: (data) => {
        this.blogs = data;
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

  addBlog2() {
    this.addBlogService.createBlog2({
      
        catBlog: this.catBlog,
        titleBlog: this.titleBlog,
        bodyBlog: this.bodyBlog,
        imageBlog: this.imageName,
        image: this.imageFile!,
        imageName: this.imageName, 
        imageThumbBlog: this.imageThumbBlog,
        

    }).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    })
  };

  addBlog() {

    
      this.addBlogService.createBlog(

        this.catBlog,
        this.titleBlog,
        this.bodyBlog,
        this.imageFile!,  
        this.imageName,

      ).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        }
      })
    

  };

  

}
