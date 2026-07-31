export interface LaceMidnightWallet {
  connect(networkId: string): Promise<LaceWalletApi>;
  isConnected(): Promise<boolean>;
  name: string;
  icon: string;
}

export interface LaceWalletApi {
  getAddresses(): Promise<{ shield: string; unshield: string }>;
  getBalance(): Promise<{ dust: bigint }>;
  getNetworkId(): Promise<string>;
  submitTx(tx: unknown): Promise<string>;
}

declare global {
  interface Window {
    midnight?: {
      lace?: LaceMidnightWallet;
    };
  }
}
