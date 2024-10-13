import React from "react";
import { Link } from "react-router-dom"; // assuming you're using React Router
import AddTicket from "./AddTicket"; // import your AddTicket form
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./supportCenter.scss"; // You can customize the styles

const SupportCenter = () => {
  return (
    <Container className="support-center">
      <h1 className="text-center mb-4">SUPPORT CENTER</h1>
      <h4 className="text-center">Support Ticket System</h4>
      <div className="text-end">
        <Link to="/login" className="small">Guest User | Sign In</Link>
      </div>
      <Row className="justify-content-center my-4">
        <Col md={8} className="text-center">
          <p>
            In order to streamline support requests, please provide as much detail as possible. A valid email is required.
          </p>
        </Col>
      </Row>
      <Row className="ticket-options">
        <Col md={6} className="text-center">
          <h5>Open a New Ticket</h5>
          <p>Provide detailed information to assist us.</p>
          <Button variant="success" size="lg">
            Open a New Ticket
          </Button>
        </Col>
        <Col md={6} className="text-center">
          <h5>Check Ticket Status</h5>
          <p>View the status and history of your tickets.</p>
          <Button variant="primary" size="lg">
            Check Ticket Status
          </Button>
        </Col>
      </Row>
      <div className="ticket-form mt-5">
        <AddTicket /> {/* Here you add the ticket form */}
      </div>
    </Container>
  );
};

export default SupportCenter;
