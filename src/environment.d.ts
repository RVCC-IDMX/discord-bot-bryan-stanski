/* eslint-disable no-unused-vars */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      CLIENT_ID: string;
      NODE_ENV: string;
      PREFIX: string;
      GUILD_ID: string;
      CHANNELS: string;
      OPEN_WEATHER: string;
    }
  }
}

export {};
