export interface Stockholding {
    symbol: string;
    shares: number;
    currency: 'CAD' | 'USD';
    purchaseDate: Date;
     status: 'past' | 'current';
}
