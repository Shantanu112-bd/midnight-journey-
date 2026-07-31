# ProofWork — Security Audit Report

## Security Audit Summary

- **Witness Isolation:** Private data (salaries, employee names, whistleblowing text) is strictly isolated inside the browser's local witness context.
- **Replay Attack Prevention:** Unique agreement hashes (`0x...`) are computed on client side and verified against on-chain ledger state.
- **Zero Memory Leakage:** Secret seed phrases and mnemonic words are never logged or stored in plain local storage.
- **Circuit Verification:** All 6 ZK circuits (`storeMessage`, `createAgreement`, `verifyAgreement`, `fileComplaint`, `castPrivateVote`, `submitAnonymousFeedback`) compile to strictly-typed ZKIR representations.
