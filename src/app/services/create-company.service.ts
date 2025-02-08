import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
  
  "name" : "ACER",
  "image" : "ACE-00001.jpg",
  
  })
}


@Injectable({
  providedIn: 'root'
})
export class CreateCompanyService {

  constructor() { }

private apiUrl04 = "https://back.swap2go.ca/addcompany";

http = inject(HttpClient);

createCompany(post: any) {

      return this.http.post(this.apiUrl04, post, httpOptions)
      // .subscribe(data => {
        // console.log("Not sure");
      // });
  
    };

   


  }