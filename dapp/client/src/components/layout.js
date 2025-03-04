import React from 'react';
import { Container, Row, Col, Button, Card, Navbar, Nav } from 'react-bootstrap';
import { Heart, Droplet, Users, Calendar, Search, Award, ArrowRight } from 'lucide-react';

import {Link} from "react-router-dom"

const Layout = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-white">
      {/* Navigation */}
   

      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              <h1 className="display-4 fw-bold mb-4">Save Lives with Blockchain Technology</h1>
              <p className="lead mb-4">
                Our decentralized application connects blood donors with those in need, ensuring transparency, 
                security, and efficiency in the blood donation process.
              </p>
              <div className="d-flex gap-3">
                <Button variant="danger" size="lg">Become a Donor</Button>
                <Button variant="outline-dark" size="lg">Learn More</Button>
              </div>
            </Col>
            <Col lg={6}>
              <img 
                src="https://img.freepik.com/free-vector/blood-donation-concept-illustration_114360-2870.jpg" 
                alt="Blood Donation Illustration" 
                className="img-fluid rounded shadow-lg"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section id="features" className="py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold">Key Features</h2>
            <p className="lead text-muted">Revolutionizing blood donation with blockchain technology</p>
          </div>
          <Row>
            {[
              {
                icon: <Droplet size={28} />,
                title: "Secure Donor Registration",
                description: "Register as a donor with your information securely stored on the blockchain.",
                color: "#ffebee"
              },
              {
                icon: <Calendar size={28} />,
                title: "Donation Tracking",
                description: "Track your donation history and impact with immutable blockchain records.",
                color: "#e8f5e9"
              },
              {
                icon: <Search size={28} />,
                title: "Find Blood Types",
                description: "Quickly search for available donors based on blood type and location.",
                color: "#e3f2fd"
              },
              {
                icon: <Award size={28} />,
                title: "Donor Rewards",
                description: "Earn tokens and recognition for your contributions to saving lives.",
                color: "#fff8e1"
              }
            ].map((feature, index) => (
              <Col md={6} lg={3} key={index} className="mb-4">
                <Card className="h-100 border-0 shadow-sm feature-card">
                  <Card.Body className="text-center p-4">
                    <div 
                      className="icon-container mx-auto" 
                      style={{ backgroundColor: feature.color }}
                    >
                      {feature.icon}
                    </div>
                    <Card.Title className="fw-bold">{feature.title}</Card.Title>
                    <Card.Text className="text-muted">{feature.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* About Section */}
      <section id="about" className="py-5 bg-light">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <img 
                src="https://img.freepik.com/free-vector/blood-donation-concept-illustration_114360-2896.jpg" 
                alt="About Blood Donation" 
                className="img-fluid rounded shadow"
              />
            </Col>
            <Col lg={6}>
              <h2 className="fw-bold mb-4">About Our DApp</h2>
              <p className="mb-4">
                The Blood Donor DApp is a blockchain-based solution that aims to revolutionize the blood donation 
                ecosystem. By leveraging smart contracts, we ensure transparency, security, and efficiency in the 
                blood donation process.
              </p>
              <div className="mb-4">
                <div className="d-flex align-items-center mb-3">
                  <Heart size={20} className="text-danger me-2" />
                  <span className="fw-medium">Transparent and secure donor registration</span>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <Users size={20} className="text-danger me-2" />
                  <span className="fw-medium">Connect donors with recipients efficiently</span>
                </div>
                <div className="d-flex align-items-center">
                  <Droplet size={20} className="text-danger me-2" />
                  <span className="fw-medium">Track donation history with immutable records</span>
                </div>
              </div>
              <Button variant="outline-danger" className="d-flex align-items-center">
                Read More <ArrowRight size={16} className="ms-2" />
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5 cta-section">
        <Container className="text-center">
          <h2 className="fw-bold mb-3">Ready to Make a Difference?</h2>
          <p className="lead mb-4">Join our network of donors and help save lives today.</p>
          <Button variant="danger" size="lg" className="px-4 py-2">
  <Link to="/RegisterDonar" style={{ textDecoration: "none", color: "white" }}>
    Register as a Donor
  </Link>
</Button>;
        </Container>
      </section>

      {/* Footer */}
      <footer className="footer py-4 mt-auto">
        <Container>
          <Row>
            <Col md={6} className="mb-3 mb-md-0">
              <div className="d-flex align-items-center">
                <Droplet size={24} color="red" className="me-2" />
                <span className="fw-bold">Blood Donor DApp</span>
              </div>
              <p className="mt-2 mb-0 text-muted">
                Connecting donors and recipients through blockchain technology.
              </p>
            </Col>
            <Col md={6} className="text-md-end">
              <p className="mb-0 text-muted">
                &copy; {new Date().getFullYear()} Blood Donor DApp. All rights reserved.
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default Layout;