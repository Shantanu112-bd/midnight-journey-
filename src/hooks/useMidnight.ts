import { useState, useCallback, useEffect } from 'react';
import { buildBrowserProviders } from '../utils/midnightProviders';
import { Contract, ledger } from '../../contract/managed/contract';
import type { DAppConnectorWalletAPI } from '@midnight-ntwrk/dapp-connector-api';
import { findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import { CompiledContract } from '@midnight-ntwrk/midnight-js-protocol/compact-js';

export interface MidnightState {
  isConnecting: boolean;
  isConnected: boolean;
  walletAddress: string;
  contract: any | null;
  globalLedger: {
    agreementCount: number;
    complaintCount: number;
    totalVotes: number;
    feedbackCount: number;
    lastAgreementHash: string;
  } | null;
}

const MidnightMoonshotsContract = (CompiledContract.make(
  'Contract',
  Contract,
).pipe(
  CompiledContract.withVacantWitnesses,
) as any);

export function useMidnight() {
  const [state, setState] = useState<MidnightState>({
    isConnecting: false,
    isConnected: false,
    walletAddress: '',
    contract: null,
    globalLedger: null,
  });

  const connect = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isConnecting: true }));
      
      if (!window.midnight?.lace) {
        throw new Error('Lace wallet not found. Please install the Midnight Lace Wallet extension.');
      }

      const walletAPI = await window.midnight.lace.enable();
      const walletState = await walletAPI.state();
      
      const config = {
        indexer: (import.meta as any).env.VITE_INDEXER_URL || 'https://indexer.preview.midnight.network/api/v4/graphql',
        indexerWS: (import.meta as any).env.VITE_INDEXER_WS_URL || 'wss://indexer.preview.midnight.network/api/v4/graphql/ws',
        proofServer: (import.meta as any).env.VITE_PROOF_SERVER_URL || 'http://127.0.0.1:6300',
      };

      const providers = await buildBrowserProviders(walletAPI, config);
      
      const contractAddressStr = (import.meta as any).env.VITE_CONTRACT_ADDRESS || '2059d899ef9ca1578b81c3e6acb493aaa9031b9f0062855c1b576ff944ae33cc';
      
      const deployedContract = await findDeployedContract(providers, {
        contractAddress: contractAddressStr,
        compiledContract: MidnightMoonshotsContract,
        privateStateId: 'ProofWorkPrivateState',
      });

      setState(prev => ({
        ...prev,
        isConnecting: false,
        isConnected: true,
        walletAddress: walletState.address,
        contract: deployedContract,
      }));

      // Start fetching global ledger state
      fetchLedger(providers.publicDataProvider, contractAddressStr);

    } catch (error) {
      console.error('Error connecting to Midnight:', error);
      setState(prev => ({ ...prev, isConnecting: false }));
      throw error;
    }
  }, []);

  const fetchLedger = async (publicDataProvider: any, addressStr: string) => {
    try {
      const contractState = await publicDataProvider.queryContractState(addressStr as any);
      if (contractState) {
        const l = ledger(contractState.data); // in midnight-js, the data is what is passed to ledger()
        setState(prev => ({
          ...prev,
          globalLedger: {
            agreementCount: Number(l.agreementCount),
            complaintCount: Number(l.complaintCount),
            totalVotes: Number(l.totalVotes),
            feedbackCount: Number(l.feedbackCount),
            lastAgreementHash: String(l.lastAgreementHash),
          }
        }));
      }
    } catch (e) {
      console.error('Failed to fetch ledger:', e);
    }
  };

  return { ...state, connect, fetchLedger };
}
