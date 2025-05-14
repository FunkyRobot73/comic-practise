import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = 'https://back.swap2go.ca';

  constructor(private http: HttpClient) { }

  getStocks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/stock`);
  }

  addStock(stock: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addstock`, stock);
  }

  // stock.service.ts
updateStockTodayPrice(id: number, todayPrice: number): Observable<any> {
  return this.http.patch(`${this.apiUrl}/stock/${id}`, { today: todayPrice });
}
}
