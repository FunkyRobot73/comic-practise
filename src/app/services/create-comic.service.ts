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
  "volume" : ""
  })
}

@Injectable({
  providedIn: 'root'
})
export class CreateComicService {
  private apiUrl02 = "https://back.swap2go.ca/addcomics";
  private baseUrl = "https://back.swap2go.ca"; // Add the base URL for comics

  constructor(private http: HttpClient) { }

  // createComic2(post: any) {
  //   return this.http.post(this.apiUrl02, post, httpOptions);
  // }

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
    volume: string,

    image: File, 
    imageName: string
  
  ): Observable<any> {

      const formData = new FormData();
      
      formData.append('title', title);
      formData.append('issue', issue);
      formData.append('type', type);
      formData.append('publisher', publisher);
      formData.append('condition', condition);
      formData.append('grade', grade);
      formData.append('key', key);
      formData.append('description', description);
      formData.append('short', short);
      formData.append('characters', characters);
      formData.append('writer', writer);
      formData.append('artist', artist);
      formData.append('year', year);
      formData.append('slabbed', slabbed);
      formData.append('isbn', isbn);
      formData.append('value',value.toString());
      formData.append('qty',qty.toString());
      formData.append('volume',volume);

      // imageFile:  File | null = null;

      formData.append('image', image, imageName);
      
      return this.http.post(this.apiUrl02, formData)
      };

      // Add these methods to your CreateComicService
updateComic(comicId: number, comicData: any): Observable<any> {
  return this.http.patch(`${this.baseUrl}/comics/${comicId}`, comicData);
}

updateComicWithImage(comicId: number, comicData: any, imageFile: File, imageName: string): Observable<any> {
  const formData = new FormData();
  
  // Append all comic data
  Object.keys(comicData).forEach(key => {
    formData.append(key, comicData[key]);
  });
  
  // Append the image file
  formData.append('image', imageFile, imageName);
  
  return this.http.patch(`${this.baseUrl}/comics/${comicId}/image`, formData);
}

}
