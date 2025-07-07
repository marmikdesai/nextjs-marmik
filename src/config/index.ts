export type Staging = 'prod' | 'localhost';

const getRuntimeConfig = () =>
  ({
    serpapikey: process.env.SERP_API_KEY,
    serpapi: process.env.SERP_API,
  }) as const;

export type EnvConfig = ReturnType<typeof getRuntimeConfig>;
export default getRuntimeConfig;
