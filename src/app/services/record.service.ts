import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor() { }

  private apiUrl01 = "https://back.swap2go.ca/records";
  private apiUrl02 = "https://back.swap2go.ca/addrecord";
    
  http = inject(HttpClient);
  
  
  getRecords() {
    return this.http.get<any>(this.apiUrl01);
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

}
