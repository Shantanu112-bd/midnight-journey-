# Public State vs Private Witness in Midnight

Midnight distinguishes itself by natively supporting both public and private state transitions. Understanding the difference between Public State and Private Witness is crucial for designing privacy-preserving decentralized applications (dApps).

## Public State
**Public State** refers to data that is stored transparently on the Midnight blockchain, visible to anyone who queries the network.
- **Transparency:** Like Ethereum or Cardano, data in the public state is immutable and globally auditable.
- **Use Cases:** Ideal for data that requires universal consensus, such as token total supplies, public configuration parameters, or Merkle roots representing batched private data.
- **In Compact:** Public state is typically defined using the `export ledger` declarations.

## Private Witness
**Private Witness** refers to the secret inputs or local state that a user provides to generate a Zero-Knowledge Proof (ZKP) on their own machine. This data is *never* broadcast to the blockchain.
- **Privacy:** It remains entirely local to the user's proof server. Only the resulting cryptographic proof is submitted to the network.
- **Use Cases:** Perfect for sensitive information such as personal identity details, private balances, or proprietary trade secrets. 
- **In Compact:** Private data is handled locally and passed into `circuit` functions as inputs. The circuit verifies the constraints without leaking the witness data to the public ledger.

By combining these two concepts, Midnight allows developers to build applications where the *validity* of an action is publicly verified without revealing the *underlying sensitive data* behind that action.
