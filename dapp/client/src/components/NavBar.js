import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { IconButton } from "@mui/material";
import { Menu, X, Home, Info, Phone, User,HeartHandshake ,Group} from "lucide-react";
import { Link } from "react-router-dom";

function NavBar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar
      expand="lg"
      expanded={expanded}
      style={{
        backgroundColor: "#000", // Pure black background
        padding: "12px 20px",
      }}
      variant="dark"
    >
      <Container>
        {/* Brand Logo */}
        <Navbar.Brand
          as={Link}
          to="/"
          style={{
            color: "#fff",
            fontSize: "22px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
          }}
        >
          <Home size={24} /> HomoChain
        </Navbar.Brand>

        {/* Toggle Button for Mobile */}
        <IconButton
          onClick={() => setExpanded(expanded ? false : "expanded")}
          style={{ color: "#fff" }}
          className="d-lg-none"
        >
          {expanded ? <X size={28} /> : <Menu size={28} />}
        </IconButton>

        {/* Navbar Links */}
        <Navbar.Collapse>
          <Nav className="ms-auto">
            {[
              { path: "/", label: "Home", icon: <Home size={20} /> },
              { path: "/allDonors", label: "Donors", icon: <Group size={20} /> },
              { path: "/RegisterDonar", label: "Register", icon: <HeartHandshake size={20} /> },
         
              { path: "/profile", label: "Profile", icon: <User size={20} /> },
   
            ].map(({ path, label, icon }) => (
              <Nav.Link
                key={path}
                as={Link}
                to={path}
                onClick={() => setExpanded(false)}
                style={{
                  color: "#fff",
                  fontSize: "18px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  textDecoration: "none",
                  padding: "8px 15px",
                  borderRadius: "8px",
                  transition: "all 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#ccc")}
                onMouseLeave={(e) => (e.target.style.color = "#fff")}
              >
                {icon} {label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
