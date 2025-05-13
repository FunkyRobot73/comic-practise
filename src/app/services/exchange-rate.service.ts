import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {
  constructor(private http: HttpClient) {}

  getUsdToCadRate(): Observable<number> {
    return this.http
      .get<any>('https://api.exchangerate.host/latest?base=USD&symbols=CAD')
      .pipe(map(res => res.rates.CAD));
  }
}
