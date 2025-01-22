import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
  "title" : "Justice League of America",
  "issue" : "200",
  "type" : "TPB",
  "year" : "1990",
  "publisher" : "DC",
  "condition" : "5",
  "key" : "1st Mister Miracle",
  "description" : "Amazing Comic",
  "short" : "Great Story & Art",
  "characters" : "Batman",
  'writer' : "Grant Morrison",
  "artist" : "George Perez",
  "image" : "dc.webp",
  "value" : 50,
  "slabbed" : "Yes",
  "createdAt" : "",
  "isbn" : "999-999-001",
  "qty" : 1,
  })
}

@Injectable({
  providedIn: 'root'
})
export class ComicbookService {

  constructor() { }

  private apiUrl01 = "https://back.swap2go.ca/comics";
  private apiUrl02 = "https://back.swap2go.ca/addcomics";

  http = inject(HttpClient);
  
  getComics() {
      return this.http.get<any>(this.apiUrl01).pipe(catchError(this.handleError));
    }
  
    private handleError(error: any){
      console.log(error);
      return throwError(()=> new Error(`Something went poop!`));
    }
    
    getComic(id: number) {
      return this.http.get(this.apiUrl01+'/'+id);
    }
    
    createComic(post: any) {
      return this.http.post(this.apiUrl02, post, httpOptions);
    }
    
    updateComic(post: any) {
      return this.http.put(this.apiUrl01+'/'+post.id, post);
    }
    
    deleteComic(id: number) {
      return this.http.delete(this.apiUrl01+'/'+id);
    }
  
    getComicsWithParams(userId: number){
      let params = new HttpParams().set('userId', userId)
      return this.http.get(this.apiUrl01, {params})
    }

}
