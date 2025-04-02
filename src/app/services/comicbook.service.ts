import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
  "title" : "Justice League of America",
  "issue" : "200",
  "type" : "TPB",
  "year" : "1990",
  "publisher" : "",
  "condition" : "5",
  "grade" : "9",
  "key" : "1st Mister Miracle",
  "description" : "Amazing Comic",
  "short" : "Great Story & Art",
  "characters" : "Batman",
  'writer' : "Grant Morrison",
  "artist" : "George Perez",
  "image" : "ACE-00001.jpg",
  "value" : 50,
  "slabbed" : "Yes",
  "createdAt" : "",
  "isbn" : "999-999-001",
  "qty" : 1,
  "volume" : "Vol. 1"
  })
}

@Injectable({
  providedIn: 'root'
})
export class ComicbookService {

  constructor() { }

  private apiUrl01 = "https://back.swap2go.ca/comics";
  private apiUrl02 = "https://back.swap2go.ca/addcomics";
  private apiUrl03 = "https://back.swap2go.ca/company";

  private apiUrl05 = "https://back.swap2go.ca/character";
  

  http = inject(HttpClient);

  private handleError(error: any){
    console.log(error);
    return throwError(()=> new Error(`Something went poop!`));
  }
  
  getComics() {
      return this.http.get<any>(this.apiUrl01).pipe(catchError(this.handleError));
    }
  
    

    createComic(post: any) {
      return this.http.post(this.apiUrl02, post, httpOptions);
    }

    
    

    getCompanys() {
      return this.http.get<any>(this.apiUrl03).pipe(catchError(this.handleError2));
    }

    getCharacters() {
      return this.http.get<any>(this.apiUrl05).pipe(catchError(this.handleError2));
    }
  
    private handleError2(error: any){
      console.log(error);
      return throwError(()=> new Error(`Something went poop!`));
    }
    
    getComic(id: number) {
      return this.http.get(this.apiUrl01+'/'+id);
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
