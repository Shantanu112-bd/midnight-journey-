import type { DAppConnectorAPI } from '@midnight-ntwrk/dapp-connector-api';

declare global {
  interface Window {
    midnight?: {
      lace?: DAppConnectorAPI;
    };
  }
}

export {};
