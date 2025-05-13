import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from '../../services/exchange-rate.service';
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
  totalValueInCAD: number = 0;
  totalValueInUSD: number = 0;
  totalProfitLossCAD: number = 0;
  totalProfitLossUSD: number = 0;
  stocks: any[] = [];
  DLO: number = 0;


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
    today: null,
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
    (data) => {
      this.stocks = data;
      this.calculateTotalProfitLoss(); // Call this after stocks are loaded
    },
    (error) => console.error('Error fetching stocks', error)
  );
}

addStock(): void {
  this.stockService.addStock(this.newStock).subscribe(
    (response) => {
      console.log('Stock added', response);
      this.loadStocks(); // This will trigger calculateTotalProfitLoss()
      this.resetForm();
    },
    (error) => console.error('Error adding stock', error)
  );
}

calculateTotalProfitLoss(): void {
  this.totalProfitLossCAD = 0;
  
  for (const stock of this.stocks) {
    if (stock.price_sold_CAD && stock.price_bought_CAD && stock.amount) {
      // CAD stocks
      this.totalProfitLossCAD += (stock.price_sold_CAD - stock.price_bought_CAD) * stock.amount;
    }
    else if (stock.price_sold_US && stock.price_bought_US && stock.amount) {
      // USD stocks - convert to CAD for consistent reporting
      const boughtValueCAD = stock.price_bought_US * stock.amount * (stock.US_CAN_Rate_bought || this.usdToCadRate);
      const soldValueCAD = stock.price_sold_US * stock.amount * (stock.US_CAN_Rate_sold || this.usdToCadRate);
      this.totalProfitLossCAD += (soldValueCAD - boughtValueCAD);
    }
  }
  
  this.totalProfitLossCAD = Math.round(this.totalProfitLossCAD * 100) / 100;
}

calculateTotalProfitLossUS(): void {
  this.totalProfitLossUSD = 0;
  
  for (const stock of this.stocks) {
    if (stock.price_sold_US && stock.price_bought_US && stock.amount) {
      // CAD stocks
      this.totalProfitLossUSD += (stock.price_sold_US - stock.price_bought_US) * stock.amount;
    }
  }
  
  this.totalProfitLossUSD = Math.round(this.totalProfitLossUSD * 100) / 100;
}

  resetForm(): void {
    this.newStock = {
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
  }

  

  calculateTotalValue(): void {
    this.totalValueInCAD = 0;
    this.totalValueInUSD = 0;

    for (const stock of this.stocks) {
      if (stock.price_bought_CAD) {
        this.totalValueInCAD += stock.price_bought_CAD * stock.amount;
      }
      if (stock.price_bought_US) {
        this.totalValueInUSD += stock.price_bought_US * stock.amount;
      }
    }

    this.totalValueInCAD = Math.round(this.totalValueInCAD * 100) / 100;
    this.totalValueInUSD = Math.round(this.totalValueInUSD * 100) / 100;
  }


  updateExchangeRates(): void {
  if (this.newStock.price_bought_CAD && this.newStock.price_bought_US) {
    this.newStock.CAN_US_Rate_bought = this.newStock.price_bought_US / this.newStock.price_bought_CAD;
    this.newStock.US_CAN_Rate_bought = this.newStock.price_bought_CAD / this.newStock.price_bought_US;
  }
  
  if (this.newStock.price_sold_CAD && this.newStock.price_sold_US) {
    this.newStock.CAN_US_Rate_sold = this.newStock.price_sold_US / this.newStock.price_sold_CAD;
    this.newStock.US_CAN_Rate_sold = this.newStock.price_sold_CAD / this.newStock.price_sold_US;
  }
}
  

}
