import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComicbookService {

  constructor(private http:HttpClient) { }

  getData(){
    return this.http.get('https://back.swap2go.ca/comics')
  }

}
