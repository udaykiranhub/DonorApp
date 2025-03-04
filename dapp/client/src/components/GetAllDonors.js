import React, { useEffect, useState } from "react";
import { Container, Spinner, Alert, Form, Row, Col, Card } from "react-bootstrap";
import { UserCircle, Search, Droplet } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AllDonors() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all donors from the backend
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await fetch("http://localhost:8080/donors");
        if (!response.ok) {
          throw new Error("Failed to fetch donors");
        }
        const data = await response.json();
        setDonors(data.donors);
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to fetch donors.");
        toast.error("Failed to fetch donors.");
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  // Filter donors based on search query
  const filteredDonors = donors.filter(
    (donor) =>
      donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.bloodType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">All Donors</h1>

      {/* Search Bar */}
      <Form.Group className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search by name or blood type..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ maxWidth: "400px", margin: "0 auto" }}
        />
      </Form.Group>

      {/* Loading State */}
      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Loading donors...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      {/* Donors List */}
      {!loading && !error && (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredDonors.length > 0 ? (
            filteredDonors.map((donor) => (
              <Col key={donor.donorID}>
                <Card className="h-100 shadow-sm">
                  <Card.Body className="text-center">
                    <UserCircle size={48} className="mb-3 text-primary" />
                    <Card.Title>{donor.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      <Droplet size={16} className="me-1" />
                      Blood Type: {donor.bloodType}
                    </Card.Subtitle>
                    <Card.Text>
                      <strong>Donor ID:</strong> {donor.donorID}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Alert variant="info" className="text-center">
              No donors found matching your search.
            </Alert>
          )}
        </Row>
      )}
    </Container>
  );
}

export default AllDonors;