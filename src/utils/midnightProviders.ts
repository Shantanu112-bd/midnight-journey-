import { type MidnightProviders } from '@midnight-ntwrk/midnight-js-types';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import type { DAppConnectorWalletAPI } from '@midnight-ntwrk/dapp-connector-api';
import type { UnboundTransaction, ZKConfigProvider, ZKIR, ProverKey, VerifierKey, ZKConfig, KeyMaterialProvider, WalletProvider, MidnightProvider } from '@midnight-ntwrk/midnight-js-types';
import { createProverKey, createVerifierKey, createZKIR } from '@midnight-ntwrk/midnight-js-types';

// Custom Wallet Provider wrapping DAppConnectorWalletAPI
export class BrowserWalletProvider implements WalletProvider, MidnightProvider {
  constructor(
    private readonly api: DAppConnectorWalletAPI,
    private readonly state: { coinPublicKey: string; encryptionPublicKey: string }
  ) {}

  async balanceTx(tx: UnboundTransaction, ttl?: Date): Promise<any> {
    const provedTx = await this.api.balanceAndProveTransaction(tx as any, []);
    return provedTx as any;
  }

  getCoinPublicKey(): any {
    return this.state.coinPublicKey as any;
  }

  getEncryptionPublicKey(): any {
    return this.state.encryptionPublicKey as any;
  }

  async submitTx(tx: any): Promise<any> {
    return await this.api.submitTransaction(tx as any) as any;
  }
}

// Custom fetch-based ZKConfigProvider
export class FetchZkConfigProvider implements ZKConfigProvider<string> {
  constructor(private readonly baseUrl: string) {}

  async getZKIR(circuitId: string): Promise<ZKIR> {
    const res = await fetch(`${this.baseUrl}/${circuitId}.zkir`);
    const buffer = await res.arrayBuffer();
    return createZKIR(new Uint8Array(buffer));
  }

  async getProverKey(circuitId: string): Promise<ProverKey> {
    const res = await fetch(`${this.baseUrl}/${circuitId}.prover`);
    const buffer = await res.arrayBuffer();
    return createProverKey(new Uint8Array(buffer));
  }

  async getVerifierKey(circuitId: string): Promise<VerifierKey> {
    const res = await fetch(`${this.baseUrl}/${circuitId}.verifier`);
    const buffer = await res.arrayBuffer();
    return createVerifierKey(new Uint8Array(buffer));
  }

  async getVerifierKeys(circuitIds: string[]): Promise<[string, VerifierKey][]> {
    return Promise.all(
      circuitIds.map(async (id) => [id, await this.getVerifierKey(id)] as [string, VerifierKey])
    );
  }

  async get(circuitId: string): Promise<ZKConfig<string>> {
    const [zkir, proverKey, verifierKey] = await Promise.all([
      this.getZKIR(circuitId),
      this.getProverKey(circuitId),
      this.getVerifierKey(circuitId),
    ]);
    return { circuitId, zkir, proverKey, verifierKey };
  }

  asKeyMaterialProvider(): KeyMaterialProvider {
    return {
      getZKIR: async (id) => this.getZKIR(id),
      getProverKey: async (id) => this.getProverKey(id),
      getVerifierKey: async (id) => this.getVerifierKey(id),
    };
  }
}

export const buildBrowserProviders = async (
  api: DAppConnectorWalletAPI,
  config: { indexer: string; indexerWS: string; proofServer: string }
): Promise<MidnightProviders<any>> => {
  const state = await api.state();
  const walletProvider = new BrowserWalletProvider(api, state);
  
  // Assuming ZK configs are served from public/zk
  const zkConfigProvider = new FetchZkConfigProvider('/zk');

  return {
    privateStateProvider: levelPrivateStateProvider({
      privateStateStoreName: `proofwork-state`,
      privateStoragePasswordProvider: () => 'proofwork-password',
      accountId: state.coinPublicKey,
    }),
    publicDataProvider: indexerPublicDataProvider(config.indexer, config.indexerWS),
    zkConfigProvider,
    proofProvider: httpClientProofProvider(config.proofServer, zkConfigProvider),
    walletProvider,
    midnightProvider: walletProvider,
  };
};
