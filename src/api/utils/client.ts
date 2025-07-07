import createClient from 'openapi-fetch';
import getRuntimeConfig from 'config';

const config = getRuntimeConfig();

export const getApiClient = createClient({
  baseUrl: config.serpapi,
  mode: 'cors',
  credentials: 'same-origin'
});
