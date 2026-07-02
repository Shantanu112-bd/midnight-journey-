import { setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { deployContract } from '@midnight-ntwrk/midnight-js-contracts';
import { type EnvironmentConfiguration } from '@midnight-ntwrk/testkit-js';
import { CompiledContract } from '@midnight-ntwrk/midnight-js-protocol/compact-js';
import pino from 'pino';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { getConfig } from './config.js';
import { MidnightWalletProvider } from './wallet.js';
import { buildProviders } from './providers.js';

import { Contract } from '../contract/managed/contract/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const zkConfigPath = path.resolve(__dirname, '..', 'contract', 'managed');

const MidnightMoonshotsContract = CompiledContract.make(
  'Contract',
  Contract,
).pipe(
  CompiledContract.withVacantWitnesses,
  CompiledContract.withCompiledFileAssets(zkConfigPath),
);

process.on('unhandledRejection', (reason) => {
  console.error('UNHANDLED REJECTION:', reason);
  process.exit(1);
});

const logger = pino({
  level: 'info',
  transport: { target: 'pino-pretty' },
});

async function main() {
  const network = 'preprod';
  logger.info(`Starting Midnight deployment to ${network}...`);
  
  const mnemonic = process.env['MIDNIGHT_PREPROD_MNEMONIC'];
  if (!mnemonic) {
    logger.error('Missing MIDNIGHT_PREPROD_MNEMONIC environment variable.');
    process.exit(1);
  }

  const config = getConfig(); // Defaults to PREPROD_CONFIG if process.env.MIDNIGHT_NETWORK is 'preprod'
  setNetworkId(config.networkId);

  const envConfig: EnvironmentConfiguration = {
    walletNetworkId: config.networkId,
    networkId: config.networkId,
    indexer: config.indexer,
    indexerWS: config.indexerWS,
    node: config.node,
    nodeWS: config.nodeWS,
    faucet: config.faucet,
    proofServer: config.proofServer,
  };

  logger.info('Connecting to wallet...');
  const wallet = await MidnightWalletProvider.build(logger, envConfig, {
    kind: 'mnemonic',
    value: mnemonic
  });
  
  await wallet.start();

  logger.info('Initializing providers...');
  const providers = buildProviders(wallet, zkConfigPath, config);

  logger.info('Deploying contract. Please ensure you have sufficient tDUST funds...');
  try {
    const deployed = await deployContract(providers, {
      compiledContract: MidnightMoonshotsContract,
      privateStateId: 'MidnightMoonshotsPrivateState',
      initialPrivateState: {},
    });

    const address = deployed.deployTxData.public.contractAddress;
    logger.info(`✅ Contract successfully deployed!`);
    logger.info(`✅ Contract Address: ${address}`);
    
    console.log(`\nDEPLOYMENT_ADDRESS=${address}\n`);

  } catch (err) {
    logger.error(`Deployment failed: ${err}`);
  } finally {
    await wallet.stop();
  }
}

main();
