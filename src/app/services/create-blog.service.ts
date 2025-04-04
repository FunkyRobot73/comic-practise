import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateBlogService {
  private apiUrl = "https://back.funkyrobot.ca/addblog";

  constructor(private http: HttpClient) { }

  // Updated method to accept FormData
  createBlog(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  // You can remove the old createBlog and createBlog2 methods if not needed elsewhere
  
};