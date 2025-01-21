import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    "artist": "Prince",
    "title": "Thriller",
    "year": "1999",
    "type": "LPP"
  })
}

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor() { }

  private apiUrl01 = "https://back.swap2go.ca/records";
  private apiUrl02 = "https://back.swap2go.ca/addrecord";
    
  http = inject(HttpClient);
  
  
  getRecords() {
    return this.http.get<any>(this.apiUrl01).pipe(catchError(this.handleError));
  }

  private handleError(error: any){
    console.log(error);
    return throwError(()=> new Error(`Something went poop!`));
  }
  
  getRecord(id: number) {
    return this.http.get(this.apiUrl01+'/'+id);
  }
  
  createRecord(post: any) {
    return this.http.post(this.apiUrl01, post);
  }
  
  updateRecord(post: any) {
    return this.http.put(this.apiUrl01+'/'+post.id, post);
  }
  
  deleteRecord(id: number) {
    return this.http.delete(this.apiUrl01+'/'+id);
  }

  getRecordsWithParams(userId: number){
    let params = new HttpParams().set('userId', userId)
    return this.http.get(this.apiUrl01, {params})
  }

}
