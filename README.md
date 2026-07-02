# Midnight Moonshots Level 1

This repository contains the completion artifacts for the **Rise In: New Moon to Full: Monthly Moonshots on Midnight** program, Level 1 ("New Moon").

## Objectives Completed

1. **Environment Setup:** Node.js 22, Docker, and the Midnight Compact Toolchain are installed and configured.
2. **Contract Development:** A simple "Hello World" style Compact contract was written (`contract/src/contract.compact`) and successfully compiled.
3. **Automated Testing:** A native Node.js test is implemented (`tests/contract.test.js`) to verify that the compiled contract bindings load properly into a JavaScript environment.
4. **Documentation:** 
   - [Public State vs Private Witness](docs/public_vs_private.md)
   - [Product Idea: Blind Auditions](docs/product_idea.md)

## Running the Project Locally

### 1. Prerequisites
- Node.js >= 22
- Docker
- Midnight Compact Compiler (`compact` CLI in your `$PATH`)

### 2. Install Dependencies
```bash
npm install
```

### 3. Compile the Contract
This command will compile the Compact contract and generate the `managed/` directory.
```bash
npm run compile
```

### 4. Run Tests
Ensure the generated contract bindings load successfully.
```bash
npm test
```

## Deployment Instructions

To fulfill the final objective of deploying to the Preprod or Preview network, you must execute this step manually using your funded wallet.

1. Obtain a Midnight Wallet (e.g., Lace or Nightly).
2. Configure your wallet for the **Preprod** network.
3. Request **tNIGHT** from the [Midnight Faucet](https://faucet.midnight.network).
4. Delegate your tNIGHT to generate **tDUST** (used for contract deployment).
5. Ensure your local Docker proof server is running:
   ```bash
   docker run -p 6300:6300 midnightntwrk/proof-server:latest midnight-proof-server -v
   ```
6. Take a screenshot of the successful compilation and deployment.
7. Record the generated **Contract Address** below.

---

**Deployed Contract Address (Preprod):** `[ENTER ADDRESS HERE]`
