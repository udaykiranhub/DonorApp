// useConnectToContract.js
import { useState, useEffect } from "react";
import Web3 from "web3";
import donarAbi from "./Donar.json"; // Ensure ABI is correct
import { contractAddress } from "./address.js"; // Ensure address is correct

export default function useConnectToContract() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function connect() {
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);
          setWeb3(web3Instance);

          const contractInstance = new web3Instance.eth.Contract(donarAbi.abi, contractAddress);
          setContract(contractInstance);
          setIsConnected(true);
        } catch (error) {
          console.error("Connection Error:", error);
          setError("Failed to connect to wallet.");
          setIsConnected(false);
        }
      } else {
        setError("MetaMask not detected. Please install it.");
        setIsConnected(false);
      }
    }

    connect();
  }, []);

  return { web3, contract, account, isConnected, error };
}