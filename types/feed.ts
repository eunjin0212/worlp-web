export interface Price {
  decimal: number;
  fraction: number;
  currency: 'KRW' | 'USD';
}

export interface Feed {
  id: string;
  cheapest: {
    vendorProductID: string;
    vendor: string;
    title: string;
    thumbnail: string;
    link: string;
    price: {
      noPriceReason?: 'NO_BUY_BOX' | 'UNKNOWN' | 'UNAVAILABLE';
      listPrice?: Price,
      discount?: {
        salePrice: Price,
        amount: Price,
        rate: number;
      }
    },
  }
}

export interface FeedList {
  list: Feed[]
}