import React, { useEffect, useState } from "react";
import { axiosSecure } from "../../../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { FaSave, FaArrowLeft, FaTrash } from "react-icons/fa";
import "./Edit.scss";

const TicketEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    const fetchTicket = async () => {
      const token = localStorage.getItem("userDetails") && JSON.parse(localStorage.getItem("userDetails")).token;

      try {
        const response = await axiosSecure.get(`/tickets/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTicket(response.data.ticket);
      } catch (err) {
        console.error("Error fetching ticket:", err);
        setError(err.response?.data.message || "Failed to fetch ticket.");
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  const handleSave = async () => {
    const token = localStorage.getItem("userDetails") && JSON.parse(localStorage.getItem("userDetails")).token;

    if (!token) {
      setError("No authorization token found. Please log in again.");
      return;
    }

    try {
      setLoading(true); 
      // Log ticket data before sending the request
      console.log("Updating ticket with data:", ticket);

      await axiosSecure.patch(`/tickets/${id}`, ticket, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccessMessage("Ticket updated successfully!");
      setIsEdited(false);
    } catch (error) {
      console.error("Error updating ticket:", error);
      setError("Failed to update ticket: " + (error.response?.data.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket((prevTicket) => ({
      ...prevTicket,
      [name]: value,
    }));
    setIsEdited(true);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      const token = localStorage.getItem("userDetails") && JSON.parse(localStorage.getItem("userDetails")).token;
      try {
        await axiosSecure.delete(`/tickets/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        navigate("/tickets");
      } catch (error) {
        setError("Failed to delete ticket: " + (error.response?.data.message || error.message));
      }
    }
  };

  if (loading) return (
    <div className="loading-spinner">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );

  if (error) return <Alert variant="danger" className="mt-3">{error}</Alert>;

  return (
    <div className="ticket-edit-container">
      <Card className="ticket-edit-card">
        <Card.Header as="h2" className="text-center">
          Edit Ticket
          <Button variant="outline-primary" className="float-start" onClick={() => navigate("/checkStatus")}>
            <FaArrowLeft /> Back
          </Button>
        </Card.Header>
        <Card.Body>
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {ticket && (
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formTicketID" className="mb-3">
                    <Form.Label>Ticket ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="id"
                      value={ticket.id || id}
                      readOnly
                      className="form-control-plaintext readonly-field"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formStatus" className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                      as="select"
                      name="status"
                      value={ticket.status || "In Progress"}
                      onChange={handleChange}
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Closed">Closed</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Form.Group controlId="formAssignee" className="mb-3">
                  <Form.Label>Assignee</Form.Label>
                  <Form.Control
                    type="text"
                    name="assignee"
                    value={ticket.assignee || "Mahmud"}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Form.Group controlId="formPriority" className="mb-3">
                <Form.Label>Priority</Form.Label>
                <Form.Control
                  as="select"
                  name="priority"
                  value={ticket.priority || "Medium"}
                  onChange={handleChange}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formDescription" className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={ticket.description || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <div className="d-flex justify-content-between">
                <Button variant="danger" onClick={handleDelete}>
                  <FaTrash /> Delete Ticket
                </Button>
                <Button variant="primary" onClick={handleSave} disabled={!isEdited || loading}>
                  <FaSave /> Save Changes
                </Button>
              </div>
            </Form>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default TicketEdit;
