import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Spinner, Alert, Form } from "react-bootstrap";
import { Avatar, Typography, Paper } from "@mui/material";
import { UserCircle, LogOut, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [donorID, setDonorID] = useState("");
  const [showInput, setShowInput] = useState(false);
  const navigate = useNavigate();

  // Check if wallet is connected
  useEffect(() => {
    const walletAddress = localStorage.getItem("walletAddress");
    if (!walletAddress) {
      toast.warning("Please connect your wallet first.");
      navigate("/");
    }
  }, [navigate]);

  // Check if user is already logged in
  useEffect(() => {
    const storedDonorID = localStorage.getItem("Id");
    if (storedDonorID) {
      fetchDonorDetails(storedDonorID);
    } else {
      setShowInput(true); // Show input field for donor ID
      setLoading(false);
    }
  }, []);

  // Fetch donor details from the backend
  const fetchDonorDetails = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/donor/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch donor details");
      }
      const data = await response.json();
      setDonor(data.donor);
      localStorage.setItem("Id", id); // Store donor ID in localStorage
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to fetch donor details.");
      toast.error("Failed to fetch donor details.");
    } finally {
      setLoading(false);
    }
  };

  // Handle donor ID submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!donorID) {
      toast.error("Please enter a valid Donor ID.");
      return;
    }
    fetchDonorDetails(donorID);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("Id");
    localStorage.removeItem("walletAddress");
    toast.success("Logged out successfully.");
    navigate("/");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : donor ? (
        <Paper elevation={4} className="p-4" style={{ width: "400px", textAlign: "center" }}>
          <Avatar sx={{ width: 80, height: 80, margin: "auto", bgcolor: "#007bff" }}>
            <UserCircle size={48} color="white" />
          </Avatar>
          <Typography variant="h5" className="mt-3">
            {donor.name}
          </Typography>
          <Typography variant="subtitle1" className="text-muted">
            Blood Type: {donor.bloodType}
          </Typography>
          <Typography variant="body2" className="mt-2 text-muted">
            Donor ID: {donor.donorID}
          </Typography>
          <Button variant="danger" className="mt-3" onClick={handleLogout}>
            <LogOut size={18} className="me-2" /> Logout
          </Button>
        </Paper>
      ) : showInput ? (
        <Paper elevation={4} className="p-4" style={{ width: "400px", textAlign: "center" }}>
          <Typography variant="h5" className="mb-3">
            Enter Your Donor ID
          </Typography>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Donor ID"
                value={donorID}
                onChange={(e) => setDonorID(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              <ArrowRight size={18} className="me-2" /> Submit
            </Button>
          </Form>
        </Paper>
      ) : (
        <Alert variant="danger">Donor not found!</Alert>
      )}
    </Container>
  );
}

export default Profile;