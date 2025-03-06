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
  "grade" : "",
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
    grade: string,
    key: string, 
    description: string,
    short: string,
    characters: string,
    writer: string,
    artist: string,
    value: number,
    slabbed: string,
    isbn: string,
    qty: number,

    image: File, 
    imageName: string
  
  ): Observable<any> {

      const formData = new FormData();
      formData.append('title', title);
      formData.append('issue', issue);
      formData.append('type', type);
      formData.append('publisher', publisher);
      formData.append('condition', condition);
      formData.append('key', key);
      formData.append('description', description);
      formData.append('grade', grade);
      formData.append('short', short);
      formData.append('characters', characters);
      formData.append('writer', writer);
      formData.append('artist', artist);
      formData.append('year', year);
      formData.append('slabbed', slabbed);
      formData.append('isbn', isbn);
      formData.append('value',value.toString());
      formData.append('qty',qty.toString());

      // imageFile:  File | null = null;

      formData.append('image', image, imageName);
      
      return this.http.post(this.apiUrl02, formData)
      };


}
