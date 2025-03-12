import { Component, inject } from '@angular/core';
import { CreateBlogService } from '../../services/create-blog.service';
import { FormsModule } from '@angular/forms';
import { ViewBlogService } from '../../services/view-blog.service';
import { Blog } from '../../models/blog';
import { CommonModule, NgFor } from '@angular/common';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-add-blog',
  imports: [FormsModule, CommonModule, NgFor],
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.css'
})

export class AddBlogComponent implements OnInit {
  
  
  titleBlog = "Just Read";
  catBlog : string = "Music";
  bodyBlog : string = "1st App. of Batman";
  imageBlog : string = "dc.jpg";
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

  ngOnInit(): void {
  this.loadData();
  }

  loadData(): void {
    this.viewBlogService.viewBlog().subscribe((response) => {
      this.blogs = response;
    });
  }

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
        image: this.imageFile!,
        imageName: this.imageName,
        imageBlog: this.imageName,
        imageThumbBlog: this.imageName,

        // image: this.imageFile!,
        // imageName: this.imageName, 
        // imageThumbBlog: this.imageThumbBlog,


    }).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    })
    this.viewBlogService.viewBlog().subscribe(() => {
      this.loadData();
    });
  };

  addBlog() {

    if (this.imageFile) {
      console.log("imageFile: ", this.imageFile);
      this.addBlogService.createBlog(

        this.catBlog,
        this.titleBlog,
        this.bodyBlog,  
        // this.imageBlog,
        this.imageFile,  
        this.imageName, 

      ).subscribe({
        next: (data) => {
          console.log(data);
          this.ngOnInit();
        },
        error: (err) => {
          console.log(err);
        }
      })
    

  } else {
    console.log("No image selected");
  }
  this.loadData();
}

}
