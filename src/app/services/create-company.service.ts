import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CreateCompanyService {
  private apiUrl04 = "https://back.swap2go.ca/addcompany";

  constructor(private http: HttpClient) { }


  createCompany(
    
    name: string, 
    image: File, 
    imageName: string
  
  ): Observable<any> {

    const formData = new FormData();
    
    formData.append('name', name);
    formData.append('image', image, imageName);
    
    return this.http.post(this.apiUrl04, formData)
    };
};