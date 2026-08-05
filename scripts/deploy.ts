import { setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { deployContract } from '@midnight-ntwrk/midnight-js-contracts';
import { type EnvironmentConfiguration } from '@midnight-ntwrk/testkit-js';
import { CompiledContract } from '@midnight-ntwrk/midnight-js-protocol/compact-js';
import pino from 'pino';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { getConfig } from './config.js';
import { MidnightWalletProvider, syncWallet } from './wallet.js';
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
  const config = getConfig();
  logger.info(`Starting Midnight deployment to active network: [${config.networkId.toUpperCase()}]...`);
  
  const mnemonic = process.env['MIDNIGHT_MNEMONIC'] || 
                   process.env['MIDNIGHT_PREVIEW_MNEMONIC'] || 
                   process.env['MIDNIGHT_PREPROD_MNEMONIC'];

  if (!mnemonic) {
    logger.error(`[Autonomous Deployment Policy Alert]`);
    logger.error(`No deployment mnemonic found in environment variables.`);
    logger.error(`To deploy autonomously, please export your wallet seed phrase:`);
    logger.error(`export MIDNIGHT_MNEMONIC="your 12 or 24 word recovery phrase"`);
    logger.error(`npm run deploy`);
    process.exit(1);
  }

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

  logger.info(`Connecting deployment wallet on ${config.networkId}...`);
  const wallet = await MidnightWalletProvider.build(logger, envConfig, {
    kind: 'mnemonic',
    value: mnemonic
  });
  
  await wallet.start();

  logger.info('Initializing Midnight providers...');
  const providers = buildProviders(wallet, zkConfigPath, config);

  logger.info('Syncing wallet state with Midnight Indexer...');
  await syncWallet(logger, wallet.wallet);

  logger.info(`Deploying contract to ${config.networkId}. Verifying sufficient tDUST balance...`);
  try {
    const deployed = await deployContract(providers, {
      compiledContract: MidnightMoonshotsContract,
      privateStateId: 'ProofWorkPrivateState',
      initialPrivateState: {},
    });

    const address = deployed.deployTxData.public.contractAddress;
    logger.info(`✅ Contract successfully deployed on ${config.networkId}!`);
    logger.info(`✅ Verified Contract Address: ${address}`);
    
    console.log(`\nDEPLOYMENT_NETWORK=${config.networkId}`);
    console.log(`DEPLOYMENT_ADDRESS=${address}\n`);

  } catch (err: any) {
    logger.error(`Deployment failed: ${err.message || err}`);
    if (config.faucet) {
      logger.info(`If deployment failed due to insufficient funds, request tDUST from: ${config.faucet}`);
    }
  } finally {
    await wallet.stop();
  }
}

main();
