Personalized Medical Vault - BitHealth
A blockchain-based decentralized application that empowers patients to securely manage and share their medical records.
Overview
BitHealth's Personalized Medical Vault leverages Ethereum blockchain technology to create a secure, tamper-proof platform that allows patients to:

Upload and store their medical records securely using IPFS
Control access to their records through smart contracts
Grant or revoke access to doctors in real-time
Maintain ownership and privacy of their health data

Doctors can access a dedicated dashboard to view only the records of patients who have explicitly shared with them.
Problem Addressed
In traditional healthcare systems:

Patients lack control over their own medical data
Records are stored in centralized databases with limited access
Data sharing between healthcare providers is inefficient
Privacy concerns and data breaches are common

BitHealth addresses these issues through decentralization, giving patients full control over their health information while maintaining security and privacy.
Technologies Used

Frontend: React.js, JavaScript, Web3.js
Blockchain: Ethereum, Solidity (v0.8.x)
Smart Contract Framework: Truffle (v5.9.0)
Local Blockchain: Ganache CLI
Browser Wallet: MetaMask
Development Tools: Node.js, npm
Decentralized Storage: IPFS (via Pinata)

System Architecture
User Roles

Patients: Register, upload records, and manage access permissions
Doctors: View patient records only after explicit permission

Smart Contract Features

Role-based access control
Record management (upload, view, access control)
Permission management (grant/revoke)
Event logging for frontend notifications

Installation & Setup
Prerequisites

Node.js and npm
Truffle (npm install -g truffle)
Ganache CLI
MetaMask browser extension

Setup Steps

Clone the repository
git clone https://github.com/username/bithealth.git
cd bithealth

Install dependencies
npm install

Start Ganache CLI
ganache-cli --port 7545

Compile and deploy smart contracts
truffle migrate --network development

Configure MetaMask

Connect MetaMask to Ganache (localhost:7545)
Import an account using private keys from Ganache


Set up IPFS via Pinata

Create a Pinata account and get API keys
Add your Pinata API keys to the project configuration


Start the application
cd client
npm start
The application will run at http://localhost:3000

Usage Flow
Patient Flow

Register as a Patient using MetaMask
Upload medical records through the UI
View personal records
Grant or revoke access to specific doctors

Doctor Flow

Register as a Doctor using MetaMask
View the list of patients who have granted access
Access and view specific patient records

Project Structure
bithealth/
├── client/                  # React frontend
│   ├── public/
│   └── src/
├── contracts/               # Solidity smart contracts
│   └── MedicalRecord.sol
├── migrations/              # Truffle migration scripts
├── test/                    # Smart contract tests
├── truffle-config.js        # Truffle configuration
└── README.md                # Project documentation
Security and Privacy Considerations

Data immutability through blockchain
Permissioned access controlled by smart contracts
Transparent record access through blockchain transactions
IPFS for distributed file storage

Future Enhancements

Timed access control for temporary doctor permissions
Specialization filtering for finding relevant healthcare providers
Emergency access codes for critical situations
Record archival system for organizing historical data
Audit logs interface for transparency
Integration with national health systems
Enhanced encryption for sensitive data
Zero-knowledge proofs for privacy-preserving validation

Contributors
Team BitHealth:

Mujaseem D (PES1UG22CS363)
N Swetha (PES1UG22CS368)
Likhit Avinash V (PES1UG22CS304)
Kripa S Rai (PES1UG22CS291)

License
This project is licensed under the MIT License - see the LICENSE file for details.
