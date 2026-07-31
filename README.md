# ProofWork — Confidential Workplace Governance Platform

> **Moonshots on Midnight: Level 2 Submission & Production MVP**  
> Powered by **Midnight Zero-Knowledge Smart Contracts** & **Lace Midnight Wallet Connector**

---

## 🛡️ Executive Overview

**ProofWork** is a confidential workplace governance platform engineered on the Midnight Blockchain. It empowers employees, team leads, and enterprise HR departments to privately create, sign, and verify workplace agreements (promotions, salary increments, performance reviews, and whistleblower complaints) without exposing confidential salary figures or employee identities to the public blockchain.

Privacy on Midnight is not just an add-on feature—**Privacy IS the Product.**

---

## 🔮 Core Features (Moonshots Level 2 MVP)

1. **Lace Wallet Connector Integration:**
   - Native integration with `@midnight-ntwrk/dapp-connector-api` for Lace Midnight Wallet.
   - Session persistence, status badges, Preprod network verification, and clean disconnect flows.
   - Built-in fallback provider mode for browser demoing without extension installed.

2. **Confidential Workplace Agreement Hub:**
   - Create, store, and verify promotion promises, salary guarantees, and performance reviews.
   - Public title disclosed on ledger while private terms remain secured in local client-side witness state.

3. **Observable ZK Privacy Inspector Matrix:**
   - Real-time visual breakdown of **Public Ledger State** vs. **Client-Side Private Witness** vs. **Generated ZK Proof** vs. **Selective Disclosure Permissions**.

4. **Anonymous Whistleblower & HR Complaint Portal:**
   - Submit workplace grievances via the `fileComplaint` ZK circuit.
   - Mathematical anonymity guarantees identity is disconnected from complaint payload hashes.

5. **Confidential Voting & Team Governance:**
   - Vote on team policies and profit-sharing resolutions via `castPrivateVote` circuit.
   - Tally public totals without exposing individual choice.

6. **AI Commitment & Risk Intelligence Engine:**
   - Local automated commitment analysis detecting unfulfilled manager promises.

---

## 🛠️ Architecture & ZK Circuits

The Compact smart contract (`contract/src/contract.compact`) defines the following ZK circuits:

- `storeMessage(newMessage)`: *[Level 1 Preserved]* Basic message disclosure circuit.
- `createAgreement(publicTitle, privateAgreementDetailsHash)`: Registers agreement hash on ledger while protecting witness payload.
- `verifyAgreement(expectedHash)`: Verifies hash match without exposing private state.
- `fileComplaint(encryptedComplaintHash)`: Increments anonymous complaint counter on ledger.
- `castPrivateVote(proposalId, voteChoice)`: Privately tallies votes for corporate resolutions.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js:** `>= 22.0.0`
- **Compact Compiler:** `compact` CLI installed in `$PATH` (v0.5.1)
- **Docker Desktop:** Running with Midnight Proof Server (`docker run -p 6300:6300 midnightntwrk/proof-server:latest`)

### 2. Install Dependencies
```bash
npm install
```

### 3. Compile ZK Smart Contract
```bash
npm run compile
```

### 4. Run Automated Test Suite
```bash
npm run test
```

### 5. Launch ProofWork DApp (Development Server)
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build Production Bundle
```bash
npm run build
```

---

## 📄 Level 2 Audit Evidence & Reports

- [Level 2 Completion Report](docs/evidence/LEVEL2_COMPLETION_REPORT.md)
- [Final Requirement Audit Checklist](docs/evidence/SUBMISSION_CHECKLIST.md)
- [Pre-Deployment Host Audit](docs/evidence/PRE_DEPLOYMENT_AUDIT.md)

---

## 🏆 Final Submission Status

✅ **LEVEL 2 COMPLETE — READY FOR SUBMISSION**
