import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { User, Heart, IdCard, AlertCircle, CheckCircle } from "lucide-react"; // Added icons
import donarAbi from "./Donar.json"; // Ensure ABI is correct
import { contractAddress } from "./address.js"; // Ensure address is correct

import {url} from "./address.js"
function Register() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [donorID, setDonorID] = useState("");
  const [name, setName] = useState("");
  const [bloodType, setBloodType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchContract() {
      try {
        if (window.ethereum) {
          const web3Instance = new Web3(window.ethereum);
          await window.ethereum.request({ method: "eth_requestAccounts" });

          setWeb3(web3Instance);
          const accounts = await web3Instance.eth.getAccounts();
          
          if (!accounts.length) {
            toast.warn("Please connect your wallet first.");
            navigate("/");
            return;
          }

          setAccount(accounts[0]);
          const contractInstance = new web3Instance.eth.Contract(donarAbi.abi, contractAddress);
          setContract(contractInstance);
        } else {
          toast.error("MetaMask not detected. Please install it.");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching contract:", error);
        toast.error("Error loading contract. Check console.");
      }
    }

    fetchContract();

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0] || null);
        toast.info("Account changed, please reconnect.");
      });
    }
  }, [navigate]);

  const registerDonor = async (e) => {
    e.preventDefault();
    if (!contract || !account) {
      toast.error("Wallet or contract not connected.");
      return;
    }

    try {
      console.log("Donor Details:", { donorID, name, bloodType, account });

  

    
      
      const tx = await contract.methods
        .registerDonor(Number(donorID), name, bloodType)
        .send({ 
          from: account,
        });
      
      console.log("Transaction Hash:", tx.transactionHash);

const donorData={
  donorID: donorID,
  name: name,
  bloodType:bloodType
}
console.log("url is:",url)

      const response = await fetch(`http://localhost:8080/registerDonor`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(donorData)
    });

    const result = await response.json();
    console.log("Response:", result.message);


    localStorage.setItem("Id",donorID)
      toast.success(
        <span>
          <CheckCircle size={20} className="me-2" />
          🎉 Donor Registered! Tx: {tx.transactionHash}
        </span>
      );

      // Clear form fields after successful registration
      setDonorID("");
      setName("");
      setBloodType("");
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error(
        <span>
          <AlertCircle size={20} className="me-2" />
          Registration Failed: {error.message || "Unknown error"}
        </span>
      );
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col md={12}>
          <h2 className="text-center mb-4">Register as a Donor</h2>
          <Form onSubmit={registerDonor} className="p-4 border rounded shadow-sm bg-light">
            <Form.Group className="mb-3">
              <Form.Label><IdCard size={20} className="me-2"/> Donor ID</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Donor ID"
                value={donorID}
                onChange={(e) => setDonorID(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><User size={20} className="me-2"/> Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><Heart size={20} className="me-2"/> Blood Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Blood Type (e.g., A+, B-)"
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="dark" type="submit" className="w-100">
              Register Donor
            </Button>
          </Form>
        </Col>
      </Row>
      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
}

export default Register;