import React, { useEffect, useState, useMemo } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom"; 
import { axiosSecure } from "../../api/axios";
import useAxios from "../../Hooks/useAxios";
import "./CheckStatus.scss";
import PaginationComponent from "../../component/Pagination/Pagination";
import Modal from "react-bootstrap/Modal"; 
import AddTicket from "../../Pages/Ticket/Add"; 
import TicketEdit from "../../Pages/Ticket/Edit"; 
import { debounce } from 'lodash';
import { useParams, useNavigate } from "react-router-dom";
import { FaSave, FaArrowLeft, FaTrash } from "react-icons/fa";

const TicketList = () => {
  const [response, error, loading, axiosFetch] = useAxios();
  const [search, setSearch] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const navigate = useNavigate();

  const fetchUserDetails = async (page = 1) => {
    await axiosFetch({
      axiosInstance: axiosSecure,
      method: "GET",
      url: `/tickets?page=${page}&limit=${ITEMS_PER_PAGE}`,
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
        currentItem.description.toLowerCase().includes(search.toLowerCase()) ||
        currentItem.assignee.toLowerCase().includes(search.toLowerCase())
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

  useEffect(() => {
    const debouncedFetch = debounce(() => {
      fetchUserDetails(currentPage);
    }, 300);
    debouncedFetch();

    return () => debouncedFetch.cancel();
  }, [search, currentPage]);

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

  return (
    <Container className="flex-grow-1">
      <div className="header-section">
        <h2 className="py-3">Ticket Listing</h2>
        <div className="ticket-stats">
          <div className="stat-item">
            <span className="stat-value">{totalItems}</span>
            <span className="stat-label">Total Tickets</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{filtered.filter(item => item.status === 'Open').length}</span>
            <span className="stat-label">Open Tickets</span>
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-between mb-4">
        <Form.Group as={Col} md="4" className="search-container">
          <i className="fas fa-search search-icon"></i>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="search-tooltip">Search by description or assignee</Tooltip>}
          >
            <Form.Control 
              onChange={handleSearch} 
              type="text" 
              placeholder="Search tickets" 
              className="search-input"
            />
          </OverlayTrigger>
        </Form.Group>
        <div className="d-flex">
        <Button variant="success" className="mb-3 me-2" onClick={() => navigate("/common")}>
          <FaArrowLeft /> Back
        </Button>
        <Button className="mb-3 me-2" variant="primary" onClick={handleShowAdd}>
          Create Ticket
        </Button>
      </div>
      </div>

      {loading && (
        <div className="skeleton-loader">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="skeleton-card">
              <div className="skeleton-header"></div>
              <div className="skeleton-body"></div>
            </div>
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="error-container">
          <i className="fas fa-exclamation-circle error-icon"></i>
          <p className="error-msg">{error}</p>
        </div>
      )}

      {totalItems > 0 && (
        <div className="ticket-grid">
          {filtered.map((item) => (
            <div key={item._id} className="ticket-card">
              <div className="ticket-header">
                <h5>Ticket ID: {item._id}</h5>
                <span className={`status-badge ${item.status.toLowerCase().replace(/\s+/g, '-')}`}>
                  {item.status}
                </span>
              </div>
              <div className="ticket-body">
                <p className="assignee">Assignee: {item.assignee}</p>
                <p className="description">{item.description}</p>
                <p className="priority">Priority: <span className={`priority-${item.priority.toLowerCase()}`}>{item.priority}</span></p>
              </div>
              <div className="ticket-footer">
                 <Link to={`/editTicket/${item._id}`}>
    <Button variant="outline-primary" size="sm">Edit</Button>
  </Link>
                <Button variant="outline-danger" size="sm" onClick={() => handleDeleteTicket(item._id)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pagination-container">
        <PaginationComponent
          total={totalItems} // Use totalItems for pagination
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      <Modal show={showAddModal} onHide={handleCloseAdd} className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Create New Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body><AddTicket /></Modal.Body>
      </Modal>

      <Modal show={showEditModal} onHide={handleCloseEdit} className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Edit Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>{selectedTicketId && <TicketEdit id={selectedTicketId} />}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TicketList;
