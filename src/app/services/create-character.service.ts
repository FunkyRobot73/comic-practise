import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateCharacterService {
  private apiUrl05 = "https://back.swap2go.ca/addcharacter";

  constructor(private http: HttpClient) { }
  
  
    createCharacter(name: string, image: File, imageName: string): Observable<any> {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('image', image, imageName);
      
      return this.http.post(this.apiUrl05, formData)
      };
};
