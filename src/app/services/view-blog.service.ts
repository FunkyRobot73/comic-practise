import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ViewBlogService {

  constructor() { }

  private apiUrl01 = "https://back.funkyrobot.ca/viewblog";
  http = inject(HttpClient);

  viewBlog() {
    return this.http.get<any>(this.apiUrl01).pipe(catchError(this.handleError));
  }

private handleError(error: any){
  console.log(error);
  return throwError(()=> new Error(`Something went poop!`));
}
  
}
