import React, { useState } from "react";
import Web3 from "web3";
import { contractAddress } from "./address";
import Donar from "./Donar.json";
import { Container, Button } from "@mui/material";

function ConnectToContract() {
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);
    const [web3instance, setWeb3instance] = useState(null);
    const [donorData, setDonorData] = useState(null);

    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                alert("Install MetaMask!");
                return;
            }

            const web3 = new Web3(window.ethereum);
            await window.ethereum.request({ method: "eth_requestAccounts" });

            const accounts = await web3.eth.getAccounts();
            setAccount(accounts[0]);
            console.log("Connected account:", accounts[0]);

            const _contract = new web3.eth.Contract(Donar.abi, contractAddress);
            setContract(_contract);
            setWeb3instance(web3);
            console.log("Contract initialized:", _contract);
        } catch (error) {
            console.error("Connection Error:", error);
        }
    };

    const sendTransaction = async () => {
        try {
            if (!contract || !account) {
                alert("Connect your wallet first!");
                return;
            }

            const tx = await contract.methods.registerDonor(222, "John", "O+").send({ from: account });
            console.log("Transaction response:", tx);
        } catch (error) {
            console.error("Transaction Error:", error);
        }
    };

    return (
        <Container>
            <h1>Blockchain Donor Registration</h1>
            <p>Connected Account: {account || "Not Connected"}</p>
            <Button variant="contained" color="primary" onClick={connectWallet}>Connect Wallet</Button>
            <Button variant="contained" color="secondary" onClick={sendTransaction} style={{ marginLeft: 10 }}>Register Donor</Button>
         
            {donorData && (
                <div>
                    <h3>Donor Details:</h3>
                    <p>Name: {donorData[0]}</p>
                    <p>Blood Type: {donorData[1]}</p>
                </div>
            )}
        </Container>
    );
}

export default ConnectToContract;