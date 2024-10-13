import React, { useEffect, useState, useMemo } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { axiosSecure } from "../../../api/axios";
import useAxios from "../../../Hooks/useAxios";
import PaginationComponent from "../../../component/Pagination/Pagination";
import Modal from "react-bootstrap/Modal";
import AddTicket from "../Add/index";
import TicketEdit from "../Edit/index";
import { debounce } from 'lodash';

const TicketList = () => {
  const [response, error, loading, axiosFetch] = useAxios();
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  const userEmail = useMemo(() => {
    const userDetails = localStorage.getItem('userDetails');
    if (userDetails) {
      const parsedDetails = JSON.parse(userDetails);
      return parsedDetails.email || 'N/A';
    }
    return 'N/A';
  }, []);

  const fetchUserDetails = async (page = 1, searchTerm = "") => {
    const searchQuery = searchTerm ? `&search=${searchTerm}` : "";
    await axiosFetch({
      axiosInstance: axiosSecure,
      method: "GET",
      url: `/tickets?page=${page}&limit=${ITEMS_PER_PAGE}${searchQuery}`,
      requestConfig: [
        {
          headers: {
            Authorization: `Bearer ${localStorage.userDetails && JSON.parse(localStorage.userDetails).token}`,
          },
        },
      ],
    });
  };

  useEffect(() => {
    fetchUserDetails(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (search) {
      const debouncedFetch = debounce(() => {
        fetchUserDetails(currentPage, search);

        // Filter suggestions by priority
        const filteredSuggestions = (response?.tickets || []).filter(ticket =>
          ticket.priority.toLowerCase().includes(search.toLowerCase())  // Match based on priority
        );

        setSuggestions(filteredSuggestions);
        setShowSuggestions(true);
      }, 300);

      debouncedFetch();
      return () => debouncedFetch.cancel();
    } else {
      setShowSuggestions(false);
    }
  }, [search, currentPage]);

  const handleStatusChange = async (ticketId, newStatus) => {
    try {
      await axiosSecure.patch(
        `/tickets/${ticketId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.userDetails && JSON.parse(localStorage.userDetails).token}`,
          },
        }
      );
      fetchUserDetails(currentPage);
    } catch (error) {
      console.error("Error updating ticket status", error);
    }
  };

  const handleDeleteTicket = async (ticketId) => {
    try {
      await axiosSecure.delete(`/tickets/${ticketId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.userDetails && JSON.parse(localStorage.userDetails).token}`,
        },
      });
      fetchUserDetails(currentPage);
    } catch (error) {
      console.error("Error deleting ticket", error);
    }
  };

  const filtered = useMemo(() => {
    let filteredResult = response?.tickets || [];
    setTotalItems(filteredResult.length);

    if (search) {
      filteredResult = filteredResult.filter((currentItem) =>
        currentItem.priority.toLowerCase().includes(search.toLowerCase())  // Filter based on priority
      );
    }
    return filteredResult.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [currentPage, response, search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion.priority);  // Set the search field with selected suggestion
    setShowSuggestions(false);  // Hide suggestions after selection
  };

  const handleShowAdd = () => setShowAddModal(true);
  const handleCloseAdd = () => setShowAddModal(false);
  const handleShowEdit = (ticketId) => {
    setSelectedTicketId(ticketId);
    setShowEditModal(true);
  };
  const handleCloseEdit = () => {
    setSelectedTicketId(null);
    setShowEditModal(false);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container fluid className="ticket-system">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Support Tickets</h2>
      </div>

      <div className="ticket-filters mb-4">
        <Form.Group as={Col} md="4" className="mb-3">
          <Form.Control 
            onChange={handleSearch} 
            value={search}
            type="text" 
            placeholder="Search by Priority (e.g., High, Medium, Low)" 
          />
        </Form.Group>
      </div>

      {loading && (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {!loading && error && <p className="alert alert-danger">{error}</p>}

      {/* Display Suggestions as Cards */}
      {showSuggestions && (
        <div className="suggestions-cards">
          {suggestions.map((suggestion) => (
            <div key={suggestion._id} className="ticket-item p-3 mb-3 border rounded">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5>Ticket ID: {suggestion._id}</h5>
                <Form.Select 
                  value={suggestion.status} 
                  onChange={(e) => handleStatusChange(suggestion._id, e.target.value)}
                  style={{ width: 'auto' }}
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </Form.Select>
              </div>
              <div className="mb-2">
                <strong>Description:</strong> {suggestion.description}
              </div>
              <div className="mb-2">
                <strong>Priority:</strong> 
                <Badge bg={suggestion.priority === 'High' ? 'danger' : suggestion.priority === 'Medium' ? 'warning' : 'info'} className="ms-2">
                  {suggestion.priority}
                </Badge>
              </div>
              <div className="mb-2">
                <strong>Assignee:</strong> {suggestion.assignee}
              </div>
              <div className="mb-2">
                <strong>Category:</strong> {suggestion.category}
              </div>
              <div className="mb-2">
                <strong>Created By:</strong> {userEmail}
              </div>
              <div className="mb-2">
                <strong>Entry Date:</strong> {formatDate(suggestion.createdAt)}
              </div>
              <div className="d-flex justify-content-end mt-3">
                <Button variant="outline-danger" size="sm" onClick={() => handleDeleteTicket(suggestion._id)}>
                  <i className="bi bi-trash"></i> Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalItems > 0 && (
        <div className="ticket-list">
          {filtered.map((item) => (
            <div key={item._id} className="ticket-item p-3 mb-3 border rounded">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5>Ticket ID: {item._id}</h5>
                <Form.Select 
                  value={item.status} 
                  onChange={(e) => handleStatusChange(item._id, e.target.value)}
                  style={{ width: 'auto' }}
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </Form.Select>
              </div>
              <div className="mb-2">
                <strong>Description:</strong> {item.description}
              </div>
              <div className="mb-2">
                <strong>Priority:</strong> 
                <Badge bg={item.priority === 'High' ? 'danger' : item.priority === 'Medium' ? 'warning' : 'info'} className="ms-2">
                  {item.priority}
                </Badge>
              </div>
              <div className="mb-2">
                <strong>Assignee:</strong> {item.assignee}
              </div>
              <div className="mb-2">
                <strong>Category:</strong> {item.category}
              </div>
              <div className="mb-2">
                <strong>Created By:</strong> {userEmail}
              </div>
              <div className="mb-2">
                <strong>Entry Date:</strong> {formatDate(item.createdAt)}
              </div>
              <div className="d-flex justify-content-end mt-3">
                <Button variant="outline-danger" size="sm" onClick={() => handleDeleteTicket(item._id)}>
                  <i className="bi bi-trash"></i> Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <PaginationComponent
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {/* Add Ticket Modal */}
      <Modal show={showAddModal} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Add Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddTicket />
        </Modal.Body>
      </Modal>

      {/* Edit Ticket Modal */}
      <Modal show={showEditModal} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTicketId && <TicketEdit ticketId={selectedTicketId} />}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default TicketList;
