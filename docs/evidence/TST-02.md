--------------------------------------------------
Task ID
TST-02

Objective
Validate Proof Server Docker orchestration

Status
VERIFIED

Evidence
- Docker container `midnight-proof-server` running successfully on port 6300.
- Proof server downloads zero-knowledge proving and verifying keys and hosts HTTP API.

Commands Executed
`docker run -d --name midnight-proof-server -p 6300:6300 midnightntwrk/proof-server:latest midnight-proof-server -v`
`docker logs midnight-proof-server`

Command Outputs
`a5be1ab2fb53a6832a7863789b7dff0895b15336a41b95abc10464801a2883d3`
Logs show `Fetching 'zswap/9/spend.prover'` and API initialization.

Generated Files
N/A

Git Commit
N/A

Verification Date
2026-07-02

Engineer Notes
Docker daemon must be running. The proof server took ~3-4 minutes to pull parameters the first time it was run. The orchestration was verified successfully.

Known Limitations
Port 6300 must be available on the host.
--------------------------------------------------
