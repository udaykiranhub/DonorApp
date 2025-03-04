# Donor Dapp

## Overview
This project is designed to register blood donors, record donations, and integrate with blockchain technology for secure and transparent data storage.
The system consists of smart contracts, a backend API, and a frontend interface.


## **Project Structure**
1. **Task 1: Smart Contract for Donor Registration**
   - **Objective**: Develop and deploy a Solidity smart contract for donor registration.
   - **Requirements**:
     - `registerDonor(uint256 ID, string memory name, string memory bloodType)` function.
     - `getDonor(uint256 ID)` function to retrieve donor details.
   - **Deliverables**:
     - Contract code
     - Deployment details (contract address, ABI)

2. **Task 2: Backend API for Donor Registration**
   - **Objective**: Create a backend API to interact with the smart contract.
   - **Requirements**:
     - Use Node.js with Web3.js.
     - Endpoints:
       - `POST /registerDonor`
       - `GET /donor/:id`
   - **Deliverables**:
     - Backend code
     - Run instructions

3. **Task 3: Frontend Form for Donor Registration**
   - **Objective**: Develop a React js  frontend form for donor registration.
   - **Requirements**:
     - Form fields: ID, name, blood type.
     - Calls `POST /registerDonor` on form submission.
   - **Deliverables**:
     - Frontend code

4. **Task 4: Smart Contract for Donation Records**
   - **Objective**: Implement and deploy a Solidity smart contract for donation records.
   - **Requirements**:
     - `addDonation(uint256 donorID, string memory date, uint256 bloodUnitID)` function.
     - `getDonations(uint256 donorID)` function to retrieve donation history.
   - **Deliverables**:
     - Contract code
     - Deployment details

5. **Task 5: Frontend to Display Donation History**
   - **Objective**: Develop a frontend page to display donor donation history.
   - **Requirements**:
     - Form to input donor ID.
     - Calls `GET /donor/:id` to retrieve donation history.
   - **Deliverables**:
     - Frontend code
     - Run instructions

## **Deployment Details**
### **Smart Contract Deployment**
- **Contract Address**: `0x74864c9b8b75681cC24C006b1C7c844D4455e62D`
- **Block**: `16`
- **ABI**: 
{"abi":[{"type":"function","name":"donorCount","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},
{"type":"function","name":"donorExistsCheck","inputs":[{"name":"_donorID","type":"uint256","internalType":"uint256"}],
"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"getDonorByID","inputs":[{"name":"_donorID","type":"uint256","internalType":"uint256"}],
"outputs":[{"name":"","type":"bytes","internalType":"bytes"}],"stateMutability":"view"},{"type":"function","name":"registerDonor","inputs":[{"name":"_donorID","type":"uint256","internalType":"uint256"},
{"name":"_name","type":"string","internalType":"string"},{"name":"_bloodType","type":"string","internalType":"string"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"event","name":"DonorRegistered","inputs":[{"name":"donorID","type":"uint256","indexed":false,"internalType":"uint256"},
{"name":"name","type":"string","indexed":false,"internalType":"string"},
{"name":"bloodType","type":"string","indexed":false,"internalType":"string"}],"anonymous":false}

- **Gas Paid**: `0.002992938738511344 ETH`

### **Backend API Deployment**
- **Run Instructions**:
  ```bash
  cd backend
  npm install
  nodemon server.js
  ```

### **Frontend Deployment**
- **Run Instructions**:
  ```bash
  cd frontend
  npm install
  npm start
  ```

## **Technical Stack**
- **Smart Contracts**: Solidity
- **Blockchain Interaction**: Web3.js 
- **Backend**: Node.js / Express
- **Frontend**: React.js
- **Database**: Ethereum Blockchain





