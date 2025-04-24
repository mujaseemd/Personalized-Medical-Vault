# 🩺 BitHealth – Personalized Medical Vault

A **blockchain-based decentralized application (DApp)** that empowers patients to securely manage and share their medical records using Ethereum and IPFS.

---

## 🚀 Overview

**BitHealth's Personalized Medical Vault** leverages the power of Ethereum smart contracts and IPFS to:

- 📤 Upload and store medical records securely
- 🔐 Maintain full ownership and privacy of data
- 👩‍⚕️ Grant or revoke record access to doctors in real-time
- 📚 Ensure tamper-proof record keeping and transparency

Doctors get a dedicated dashboard to view records **only** of patients who have explicitly granted them access.

---

## 💡 Problem Statement

Traditional healthcare systems face multiple issues:

❌ Patients have little control over their data  
❌ Records are centralized, hard to access across providers  
❌ Sharing medical history is inefficient  
❌ Privacy violations and data breaches are frequent  

### ✅ **BitHealth Solution:**

- ✅ Patient-first ownership model
- ✅ Decentralized architecture using Ethereum & IPFS
- ✅ Real-time access control
- ✅ Transparent access logs via blockchain

---

## 🛠️ Technologies Used

| Layer        | Tools/Frameworks |
|--------------|------------------|
| **Frontend** | React.js, JavaScript, Web3.js |
| **Blockchain** | Ethereum, Solidity `v0.8.x` |
| **Smart Contract Dev** | Truffle `v5.9.0`, Ganache CLI |
| **Wallet** | MetaMask |
| **Storage** | IPFS (via Pinata) |
| **Dev Tools** | Node.js, npm |

---

## 🧑‍💻 User Roles

### 👨‍⚕️ Doctors
- Register using MetaMask
- View patient records (with permission only)

### 🧑‍🔬 Patients
- Register and login
- Upload medical records
- Grant/revoke access to specific doctors
- View and manage their medical data

---

## 🧠 Smart Contract Features

- ✅ Role-based access control (Doctors & Patients)
- ✅ Medical record upload and retrieval
- ✅ Permission management (grant/revoke access)
- ✅ Event logging for frontend notifications and audit

---

## 🏗️ System Architecture

Patient ↔ React UI ↔ Web3.js ↔ Ethereum Smart Contract ↔ IPFS ↕ MetaMask


---

## 📦 Installation & Setup

### ✅ Prerequisites

- [Node.js](https://nodejs.org/)
- [Truffle](https://trufflesuite.com/) (`npm install -g truffle`)
- [Ganache CLI](https://trufflesuite.com/ganache/)
- [MetaMask](https://metamask.io/)
- [Pinata IPFS Account](https://pinata.cloud/)

---

### ⚙️ Setup Steps

bash
# Clone the repository
git clone https://github.com/username/bithealth.git
cd bithealth

# Install backend and smart contract dependencies
npm install

# Start Ganache on port 7545
ganache-cli --port 7545

# Compile and deploy smart contracts
truffle migrate --network development

---

🔗 Configure MetaMask
Connect MetaMask to http://localhost:7545

Import an account using Ganache private key

📁 Set Up IPFS via Pinata
Create an account on Pinata

Generate API Key & Secret

Add your Pinata API keys to project config (.env or config file)

🖥️ Start the Frontend
bash
Copy
Edit
cd client
npm install
npm start
The app will run at: http://localhost:3000

---

🔄 Usage Flow

🧑 Patient Flow
Connect MetaMask

Register as a patient

Upload medical records

Grant or revoke access to doctors

View personal record history

👨‍⚕️ Doctor Flow
Connect MetaMask

Register as a doctor

View list of patients who have shared access

Access and read shared records
---


🔐 Security & Privacy

🛡️ Immutability ensured by blockchain

🔐 Permissioned access via smart contracts

📜 Transparent access logs stored on-chain

🌍 Distributed record storage using IPFS

---
🌟 Future Enhancements

⏳ Timed access control (auto-expiry)

🩻 Specialization-based doctor filtering

🆘 Emergency access codes

🗃️ Record archiving system

📑 Visual audit logs interface

🏥 Integration with national health portals

🔒 Enhanced end-to-end encryption

🕵️‍♂️ Zero-knowledge proof-based access
---

👥 Contributors

Team BitHealth – PES University:

Mujaseem D (PES1UG22CS363)

N Swetha (PES1UG22CS368)

Kripa S Rai (PES1UG22CS291)

Likhit Avinash V (PES1UG22CS304)
