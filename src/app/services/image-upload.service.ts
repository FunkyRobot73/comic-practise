import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
  "name" : "EPIC COmics",
  "image" : "ACE-00001.jpg",
  })
}

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {private uploadUrl = "https://back.swap2go.ca/addcompany"; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.post(this.uploadUrl, formData, {
      headers: new HttpHeaders({
        "image" : "dc.jpg", // Custom headers can be added here if needed
      }),
    });
  }
}
