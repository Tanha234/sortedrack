import React from "react"; 
import { Link } from "react-router-dom"; // assuming you're using React Router

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card"; // Make sure to import Card
import openTicketIcon from "../../../src/assests/images/open_ticket.png"; // Add your image path
import checkTicketIcon from "../../../src/assests/images/check_ticket.png"; // Add your image path
import "./supportCenter.scss"; // You can customize the styles

const SupportCenter = () => {
  return (
   

    <Container className="support-center">
      <h1 className="text-center mb-4 mt-5 fancy-heading">SUPPORT CENTER</h1>
<h4 className="text-center fancy-subheading">Support Ticket System</h4>

    
      <Row className="justify-content-center mb-5 mt-3">
        <Col md={8} className="text-center">
          <p>
          Streamline Your Support: Please Provide Detailed Information for Swift Assistance!
          </p>
        </Col>
      </Row>
      <Row className="ticket-options justify-content-center" style={{ paddingTop: "30px" }}>
        <Col md={4} className="text-center">
          <Card className="mb-4 custom-card">
            <Card.Body>
              <img src={openTicketIcon} alt="Open Ticket Icon" className="ticket-icon mb-3" />
              <h5>Open a New Ticket</h5>
              <p>Provide detailed information to assist us.</p>
              <Button variant="success" size="md" as={Link} to="/tickets/add">
  Open a New Ticket
</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="text-center">
          <Card className="mb-4 custom-card">
            <Card.Body>
              <img src={checkTicketIcon} alt="Check Ticket Icon" className="ticket-icon mb-3" />
              <h5>Check Ticket Status</h5>
              <p>View the status and history of your tickets.</p>
              <Button variant="success" size="md" as={Link} to="/checkStatus">
                Check Ticket Status
              
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="ticket-form mt-5">
        {/* You can add the form here if needed */}
      </div>
    </Container>
  
  );
};

export default SupportCenter;
