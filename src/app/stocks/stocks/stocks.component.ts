import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from '../../services/exchange-rate.service';
import { Stockholding } from '../../models/stockholding';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-stocks',
  imports: [FormsModule, CommonModule],
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.css'
})
export class StocksComponent implements OnInit {

  
  usdToCadRate: number = 1;

  stocks: any[] = [];

  newStock: any = {
    symbol: '',
    name: '',
    date_purchased: '',
    price_bought_CAD: null,
    price_sold_CAD: null,
    price_bought_US: null,
    price_sold_US: null,
    date_sold: null,
    CAN_US_Rate_bought: null,
    US_CAN_Rate_bought: null,
    CAN_US_Rate_sold: null,
    US_CAN_Rate_sold: null,
    amount: null,
    notes: ''
  };

  constructor(private exchangeService: ExchangeRateService, private stockService: StockService) { }

  ngOnInit(): void {
    this.loadStocks();
    this.exchangeService.getUsdToCadRate().subscribe(rate => {
      this.usdToCadRate = rate;
    });
  }

  loadStocks(): void {
    this.stockService.getStocks().subscribe(
      (data) => this.stocks = data,
      (error) => console.error('Error fetching stocks', error)
    );
  }

  addStock(): void {
    this.stockService.addStock(this.newStock).subscribe(
      (response) => {
        console.log('Stock added', response);
        this.loadStocks();
        this.resetForm();
      },
      (error) => console.error('Error adding stock', error)
    );
  }

  resetForm(): void {
    this.newStock = {
      symbol: '',
      name: '',
      date_purchased: '',
      price_bought_US: null,
      CAN_US_Rate_bought: null,
      US_CAN_Rate_bought: null,
      notes: '',
      amount:''
    };
  }

  

  getHoldingValueInCAD(holding: Stockholding): number {
    // Dummy price per share for demonstration (replace with real data if needed)
    const pricePerShare = 100;
    const baseValue = holding.shares * pricePerShare;
    return holding.currency === 'CAD' ? baseValue : baseValue * this.usdToCadRate;
  }
}
