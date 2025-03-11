import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers:new HttpHeaders({
    
    "catBlog": "",
    "titleBlog": "",
    "bodyBlog": "",
    "imageBlog": "",
    "imageThumbBlog": "",
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
    imageBlog: File,
    imageName: string,
    // imageThumbBlog: string

  ): Observable<any> {

    const formData = new FormData();

    formData.append('catBlog', catBlog);
    formData.append('titleBlog', titleBlog);
    formData.append('bodyBlog', bodyBlog);
    
    formData.append('imageBlog', imageBlog, imageName);
    // formData.append('imageThumbBlog', imageThumbBlog);

    return this.http.post(this.apiUrl02, formData);
    
  }

  createBlog2(post: any) {
    return this.http.post(this.apiUrl02, post, httpOptions);
  }

};
