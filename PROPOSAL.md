# ProofWork - Midnight Moonshots Project Proposal

## 1. Project Overview
**ProofWork** is a decentralized, privacy-preserving workplace governance platform built on the Midnight blockchain. It addresses the critical need for verifiable commitments and confidential feedback in professional environments. ProofWork empowers employees and employers to mathematically guarantee agreements, salary increments, and team governance votes without exposing sensitive HR data on a public ledger.

## 2. Problem Statement
Workplace trust is often broken due to unrecorded verbal commitments, lack of whistleblower protections, and fear of retaliation. When disputes arise, it is difficult to prove the existence of an agreement or complaint without exposing identities and confidential terms. Centralized HR systems fail to provide cryptographic guarantees of privacy and accountability.

## 3. Solution leveraging Midnight
By leveraging Midnight's Zero-Knowledge (ZK) smart contracts (Compact), ProofWork wraps workplace interactions in cryptography.
- **Confidential Agreements**: Salaries, bonuses, and promotion promises are stored as private witnesses. Only the zero-knowledge proof of the agreement is posted to the public ledger.
- **Anonymous Whistleblowing**: Employees can file complaints that are mathematically verified against company policies without revealing their identity.
- **Private Governance**: Team members can cast votes on resolutions without exposing their individual choices, while the aggregate result remains publicly verifiable.

## 4. Architecture
- **Smart Contracts**: Written in Compact, compiling into ZK circuits (e.g., `createAgreement`, `fileComplaint`, `castPrivateVote`).
- **Frontend**: React/Vite application providing a seamless UI for interacting with the blockchain.
- **Wallet Integration**: Integrates the Midnight Lace Wallet for signing transactions securely.
- **State Management**: Uses `@midnight-ntwrk/midnight-js` to synchronize the public indexer state and the local encrypted private state (LevelDB).
- **Proof Generation**: Offloads heavy cryptographic proof generation to the local Docker Proof Server.

## 5. Moonshots Submission Context
This project represents the culmination of Levels 1, 2, and 3 of the Midnight Moonshots program.
- **Level 1**: Compact smart contracts successfully compiled, tested, and deployed to the Preview network.
- **Level 2**: End-to-end integration with the Midnight SDK and Lace Wallet, eliminating mocked data and binding UI elements directly to live smart contract transactions.
- **Level 3**: Implementation of complex business logic including anonymous feedback and private voting, demonstrating advanced zero-knowledge use cases in a real-world scenario.
