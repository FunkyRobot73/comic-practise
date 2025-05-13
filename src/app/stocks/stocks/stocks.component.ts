import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from '../../services/exchange-rate.service';
import { Stockholding } from '../../models/stockholding';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stocks',
  imports: [FormsModule, CommonModule],
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.css'
})
export class StocksComponent implements OnInit {

  holdings: Stockholding[] = [];
  newHolding: Stockholding = {
    symbol: '',
    shares: 0,
    currency: 'USD',
    purchaseDate: new Date(),
    status: 'current'
  };
  usdToCadRate: number = 1;

  constructor(private exchangeService: ExchangeRateService) {}

  ngOnInit() {
    this.exchangeService.getUsdToCadRate().subscribe(rate => {
      this.usdToCadRate = rate;
    });
  }

  addHolding() {
    this.holdings.push({ ...this.newHolding });
    this.newHolding = {
      symbol: '',
      shares: 0,
      currency: 'USD',
      purchaseDate: new Date(),
      status: 'current'
    };
  }

  getHoldingValueInCAD(holding: Stockholding): number {
    // Dummy price per share for demonstration (replace with real data if needed)
    const pricePerShare = 100;
    const baseValue = holding.shares * pricePerShare;
    return holding.currency === 'CAD' ? baseValue : baseValue * this.usdToCadRate;
  }
}
