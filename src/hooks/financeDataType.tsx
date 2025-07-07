export type FinanceDataTypes = {
  news_results: {
    date: string,
    link: string,
    snippet: string,
    source: string,
    thumbnail: string
  },
  summary: {
    title: string,
    stock: string,
    exchange: string,
    price: string,
    extracted_price: number,
    currency: string,
    extensions: []
  },
  financials: {
    title: string,
    results: {
      date: string,
      period_type: string,
      table: {
        change: string;
        description: string;
        title: string;
        value: string;
      }[]
    }[]
  }
}