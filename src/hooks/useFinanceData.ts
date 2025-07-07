import getRuntimeConfig from 'config';
import { getJson } from "serpapi";
import { use } from 'react'

export const useFinanceData = (query: string) => {
  const config = getRuntimeConfig();
  const response = getJson({
    engine: "google_finance",
    api_key: config.serpapikey,
    q: query,
  });

  const financeData = use(response)

  return financeData;
};
