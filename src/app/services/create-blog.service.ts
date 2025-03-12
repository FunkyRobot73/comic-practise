import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers:new HttpHeaders({
    
    "catBlog": "bbb",
    "titleBlog": "cccc",
    "bodyBlog": "dddd",
    "image": "",
    "imageName": "",
    // "imageBlog": "",
    "imageThumbBlog": "",
    // "createdAt": "",
    // "updatedAt": "",

  })
};

@Injectable({
  providedIn: 'root'
})
export class CreateBlogService {

  private apiUrl02 = "https://back.funkyrobot.ca/addblog";

  constructor(private http: HttpClient) { }

  createBlog(

    catBlog: string,
    titleBlog: string,
    bodyBlog: string,
    image: File,
    imageName: string
    // imageThumbBlog: string

  ): Observable<any> {

    const formData = new FormData();
    
    formData.append('catBlog', catBlog);
    formData.append('titleBlog', titleBlog);
    formData.append('bodyBlog', bodyBlog);
    
    formData.append('image', image, imageName);
    // formData.append('imageThumbBlog', imageThumbBlog);

    return this.http.post(this.apiUrl02, formData);
    
  }

  createBlog2(post: any) {
    return this.http.post(this.apiUrl02, post, httpOptions);
  }

};
