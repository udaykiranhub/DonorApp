import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "react-bootstrap";

function Wallet() {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const savedAccount = localStorage.getItem("walletAddress");
    if (savedAccount) {
      setAccount(savedAccount);
    }
  }, []);


  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });


        if (accounts.length > 0) {
          setAccount(accounts[0]);
          localStorage.setItem("walletAddress", accounts[0]);
          toast.success("Wallet Connected Successfully!");
        } else {
          toast.warn("No Wallet Address Found!");
        }
      } catch (error) {
        toast.error("Connection Failed: " + error.message);
      }
    } else {
      toast.error("MetaMask is not installed. Please install it.");
    }
  };

  return (
    <div style={styles.container}>
      <Button
        onClick={connectWallet}
        variant="dark"
        size="lg"
        style={styles.button}
        onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
        onMouseLeave={(e) => (e.target.style.opacity = "1")}
      >
        {account ? account.slice(0, 6) + "..." + account.slice(-4) : "Connect Wallet"}
      </Button>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50vh",
  },
  button: {
    background: "linear-gradient(60deg, #000, #333)",
    color: "#fff",
    border: "2px solid #fff",
    padding: "12px 24px",
    fontSize: "18px",
    fontWeight: "bold",
    borderRadius: "8px",
    transition: "all 0.3s ease-in-out",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
};

export default Wallet;