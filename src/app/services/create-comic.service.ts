import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
  "title" : "",
  "issue" : "",
  "type" : "",
  "year" : "",
  "publisher" : "",
  "condition" : "",
  "key" : "",
  "description" : "",
  "short" : "",
  "characters" : "",
  'writer' : "",
  "artist" : "",
  "image" : "",
  "value" : 50,
  "slabbed" : "N",
  "createdAt" : "",
  "isbn" : "",
  "qty" : 1,
  })
}

@Injectable({
  providedIn: 'root'
})
export class CreateComicService {
  private apiUrl02 = "https://back.swap2go.ca/addcomics";

  constructor(private http: HttpClient) { }

  createComic2(post: any) {
    return this.http.post(this.apiUrl02, post, httpOptions);
  }

  createComic(
    
    title: string, 
    issue: string, 
    type: string, 
    year: string, 
    publisher: string, 
    condition: string, 
    key: string, 
    description: string, 
    image: File, 
    imageName: string
  
  ): Observable<any> {

      const formData = new FormData();
      formData.append('title', title);
      formData.append('issue', issue);
      formData.append('image', image, imageName);
      
      return this.http.post(this.apiUrl02, formData)
      };


}
