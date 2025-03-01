import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateCharacterService {
  private apiUrl04 = "https://back.swap2go.ca/addcompany";

  constructor(private http: HttpClient) { }
  
  
    createCompany(name: string, image: File, imageName: string): Observable<any> {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('image', image, imageName);
      
      return this.http.post(this.apiUrl04, formData)
      };
};
