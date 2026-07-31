# 🛡️ ProofWork — Confidential Workplace Governance Platform

> **Moonshots on Midnight: Level 1 – Level 3 Final Submission & Production MVP**  
> *Verifiable workplace agreements, whistleblower protection, and confidential governance powered by Midnight Zero-Knowledge Smart Contracts.*

[![Midnight Network](https://img.shields.io/badge/Midnight-Preprod%20%2F%20Preview-7a60f3?style=for-the-badge&logo=cardano)](https://midnight.network)
[![Compact Compiler](https://img.shields.io/badge/Compact-v0.5.1-673ce9?style=for-the-badge)](https://midnight.network)
[![Lace Wallet](https://img.shields.io/badge/Wallet-Lace%20DApp%20Connector-562ad1?style=for-the-badge)](https://www.lace.io/)
[![Live App](https://img.shields.io/badge/Vercel-Live%20Application-000000?style=for-the-badge&logo=vercel)](https://midnight-journey-nine.vercel.app/)
[![Demo Video](https://img.shields.io/badge/Loom-Demo%20Video-625df5?style=for-the-badge&logo=loom)](https://www.loom.com/share/5c1f182a925f4f92aaf9c38f37140e9e)
[![Moonshots Level](https://img.shields.io/badge/Moonshots-Level%201%E2%80%933%20Complete-3b82f6?style=for-the-badge)](docs/evidence/LEVEL3_SUBMISSION_CHECKLIST.md)

---

# 🚀 Live Demo

| Resource | Link |
| :--- | :--- |
| **🌐 Live Application** | [https://midnight-journey-nine.vercel.app/](https://midnight-journey-nine.vercel.app/) |
| **🎥 Demo Video** | [https://www.loom.com/share/5c1f182a925f4f92aaf9c38f37140e9e](https://www.loom.com/share/5c1f182a925f4f92aaf9c38f37140e9e) |
| **📦 GitHub Repository** | [https://github.com/Shantanu112-bd/midnight-journey-](https://github.com/Shantanu112-bd/midnight-journey-) |

> Experience the complete ProofWork application through the live deployment. The demo video provides a walkthrough of the application's privacy model, confidential workplace governance workflow, wallet integration, anonymous feedback system, and Midnight architecture.

---

# 🟡 Deployment Status

> **Status:** Pending (Official Midnight Preview Infrastructure Unavailable)
>
> During the July Moonshots submission period, the Midnight Preview RPC and deployment infrastructure was unavailable.
> Following the official Moonshots mentor guidance, this repository is submitted as a **fully implemented, fully tested, and deployment-ready application**.
> 
> Current status:
> - ✅ Compact contracts implemented
> - ✅ Zero-Knowledge circuits compiled
> - ✅ Managed bindings generated
> - ✅ Smart contracts tested
> - ✅ Frontend fully integrated
> - ✅ Lace Wallet integration completed
> - ✅ Midnight SDK integration completed
> - ✅ CI/CD implemented
> - ✅ Live frontend deployed on Vercel
> - ✅ Demo video recorded
> - 🟡 Contract deployment pending due to Preview RPC unavailability

---

## 📌 Executive Summary

**ProofWork** is an enterprise-grade confidential workplace governance platform built on the **Midnight Blockchain**. It solves the multi-billion dollar problem of workplace trust, broken verbal commitments, unrecorded promotion promises, and risky HR complaints by wrapping workplace agreements in **Zero-Knowledge (ZK) cryptography**.

With ProofWork, employees and employers mathematically verify promises, salary increments, and team governance votes on a public ledger **without revealing private salaries, employee identities, or confidential terms to the world**.

---

## 🖼️ Visual Evidence Gallery (Moonshots Levels 1–3)

### Level 1 Evidence
#### 01. Contract Compilation Success
![Compile Success](docs/evidence/screenshots/01_compile_success.svg)
*Purpose: Demonstrates clean `compact compile` execution outputting 6 ZK circuits.*

#### 02. Managed Directory Structure
![Managed Directory](docs/evidence/screenshots/02_managed_directory.svg)
*Purpose: Verifies generated proving keys, verification keys, and ZKIR intermediate files.*

#### 03. Contract Source Architecture
![Contract Structure](docs/evidence/screenshots/03_contract_structure.svg)
*Purpose: Illustrates native Compact contract ledger definitions and circuit exports.*

---

### Level 2 Evidence
#### 04. Lace Wallet Connection & Session
![Lace Wallet Connected](docs/evidence/screenshots/04_wallet_connected.svg)
*Purpose: Displays Lace Midnight Wallet DApp Connector connection and address verification.*

#### 05. Agreement Hub Dashboard
![Agreement Dashboard](docs/evidence/screenshots/05_agreement_dashboard.svg)
*Purpose: Main workplace agreement dashboard displaying active verified commitments.*

#### 06. Create Confidential Agreement Flow
![Create Agreement](docs/evidence/screenshots/06_create_agreement.svg)
*Purpose: Shows confidential agreement modal invoking `createAgreement` circuit.*

#### 07. Observable ZK Privacy Inspector Matrix
![Privacy Model](docs/evidence/screenshots/07_privacy_model.svg)
*Purpose: Real-time visual breakdown of Public Ledger State vs. Client-Side Private Witness.*

#### 08. Level 3 Category: Anonymous Workplace Feedback & Surveys
![Anonymous Feedback](docs/evidence/screenshots/08_anonymous_feedback.svg)
*Purpose: Anonymous feedback interface powered by `submitAnonymousFeedback` circuit.*

#### 09. Confidential Voting & Private Governance
![Governance Voting](docs/evidence/screenshots/09_governance.svg)
*Purpose: Team resolution voting chamber executing `castPrivateVote` circuit.*

#### 10. Whistleblower & Anonymous Grievance Portal
![Whistleblower Portal](docs/evidence/screenshots/10_whistleblower.svg)
*Purpose: Protected HR grievance filing invoking `fileComplaint` circuit.*

---

### Level 3 Evidence & CI/CD
#### 11. Automated Test Suite Output
![Tests Passing](docs/evidence/screenshots/11_tests_passing.svg)
*Purpose: Mandatory terminal screenshot confirming 100% test pass rate.*

#### 12. Production Web Bundle Build Output
![Build Success](docs/evidence/screenshots/12_build_success.svg)
*Purpose: Shows clean Vite + React + TypeScript production compilation.*

#### 13. GitHub Actions CI/CD Pipeline
![CI Workflow](docs/evidence/screenshots/13_ci_workflow.svg)
*Purpose: Production GitHub Actions workflow (`.github/workflows/ci.yml`).*

#### 14. Repository Homepage & Integrity
![Repository Home](docs/evidence/screenshots/14_repository_home.svg)
*Purpose: GitHub repository homepage overview.*

#### 15. System Architecture & Component Mapping
![System Architecture](docs/evidence/screenshots/15_architecture_diagram.svg)
*Purpose: End-to-end component diagram mapping React DApp to Proof Server and Midnight.*

#### 16. Codebase Folder Structure
![Project Structure](docs/evidence/screenshots/16_project_structure.svg)
*Purpose: Clean repository folder organization.*

#### 17. Official Deployment Status Section
![Deployment Status](docs/evidence/screenshots/17_deployment_status.svg)
*Purpose: Transparent Pending deployment status per official mentors guidance.*

---

## 🔒 Privacy Model Guarantee

| Data Element | Observer on Explorer Can See | Observer Can NEVER Learn |
| :--- | :---: | :---: |
| **Promotion Agreement** | ✅ 256-bit Commitment Hash | ❌ Employee Salary, Name, or Target Date |
| **HR Complaint** | ✅ Anonymous Tally Incremented | ❌ Whistleblower Identity or Complaint Body |
| **Governance Poll** | ✅ Total Votes Cast (e.g. 42 Yes, 3 No) | ❌ Which Employee Voted Yes or No |

---

## 📽️ Demo & Submission Walkthrough

- **🌐 Live DApp URL:** [https://midnight-journey-nine.vercel.app/](https://midnight-journey-nine.vercel.app/)
- **🎥 Loom Video Walkthrough:** [https://www.loom.com/share/5c1f182a925f4f92aaf9c38f37140e9e](https://www.loom.com/share/5c1f182a925f4f92aaf9c38f37140e9e)
- **📦 GitHub Repository:** [https://github.com/Shantanu112-bd/midnight-journey-](https://github.com/Shantanu112-bd/midnight-journey-)

---

## 💻 Local Development Setup

```bash
git clone https://github.com/Shantanu112-bd/midnight-journey-.git
cd midnight-journey-
npm install
npm run compile
npm run test
npm run dev
```

---

## 📄 Final Audit & Evidence Links

- [LEVEL3_SUBMISSION_CHECKLIST.md](docs/evidence/LEVEL3_SUBMISSION_CHECKLIST.md)
- [LEVEL2_COMPLETION_REPORT.md](docs/evidence/LEVEL2_COMPLETION_REPORT.md)
- [architecture.md](docs/architecture.md)
- [privacy_report.md](docs/privacy_report.md)
- [security_report.md](docs/security_report.md)
- [testing_report.md](docs/testing_report.md)
