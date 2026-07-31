# ProofWork — Technical Architecture Documentation

## Overview
ProofWork is a privacy-first workplace governance platform built on Midnight. It relies on a hybrid execution model where private state operations are executed locally on the user's browser, and Zero-Knowledge proofs are submitted to the Midnight network.

```
+-----------------------------------------------------------------------------------+
|                            ON-CHAIN PUBLIC LEDGER                                 |
|  - message: Opaque<"string">                                                      |
|  - lastAgreementHash: Opaque<"string">                                            |
|  - agreementCount: Uint<32>                                                       |
|  - complaintCount: Uint<32>                                                       |
|  - totalVotes: Uint<32>                                                           |
|  - feedbackCount: Uint<32>                                                        |
+-----------------------------------------------------------------------------------+
                                          ▲
                                          │ Zero-Knowledge Proof (zk-SNARK)
                                          │
+-----------------------------------------------------------------------------------+
|                        CLIENT-SIDE PRIVATE WITNESS                                |
|  - Employee Names & Identities                                                    |
|  - Plaintext Salary & Increment Figures                                           |
|  - Anonymous Whistleblower Details                                                |
|  - Private Vote Selection & Survey Content                                        |
+-----------------------------------------------------------------------------------+
```

## Core Modules
1. **Compact Contract (`contract/src/contract.compact`)**: Defines 6 ZK circuits (`storeMessage`, `createAgreement`, `verifyAgreement`, `fileComplaint`, `castPrivateVote`, `submitAnonymousFeedback`).
2. **Frontend DApp (`src/App.tsx`)**: React + TypeScript + Vite application with Lace Midnight Wallet DApp Connector API integration.
3. **Proof Server (`127.0.0.1:6300`)**: Local Docker container generating zk-SNARK proving key evaluations.
4. **Local LevelDB Private State**: Client-side storage maintaining private witness history.
