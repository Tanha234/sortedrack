import React, { useEffect, useState, useMemo } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom"; 
import { axiosSecure } from "../../../api/axios";
import useAxios from "../../../Hooks/useAxios";
import "./listUser.scss";
import PaginationComponent from "../../../component/Pagination/Pagination";
import Modal from "react-bootstrap/Modal"; 
import AddTicket from "../Add/index"; 
import TicketEdit from "../Edit/index"; 
import { debounce } from 'lodash';

const TicketList = () => {
  const [response, error, loading, axiosFetch] = useAxios();
  const [search, setSearch] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(null);

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

  // Fetch user details on mount and when currentPage or search changes
  useEffect(() => {
    fetchUserDetails(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (search) {
      const debouncedFetch = debounce(() => fetchUserDetails(currentPage), 300);
      debouncedFetch();
      return () => debouncedFetch.cancel(); // Cancel the debounce on unmount
    } else {
      fetchUserDetails(currentPage);
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
      fetchUserDetails(currentPage); // Refresh the ticket list after updating
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
      <div className="d-flex align-items-center justify-content-between">
        <div className="col-8">
          <h2 className="py-3">Ticket Listing</h2>
        </div>
        <Form.Group as={Col} md="3" className="pe-3" controlId="validationCustom01">
          <Form.Control onChange={handleSearch} type="text" placeholder="Search tickets" />
        </Form.Group>
        <div style={{ width: "200px" }} className="col-1">
          <button onClick={handleShowAdd} className="btn btn-primary">Add Ticket</button>
        </div>
      </div>
      {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {!loading && error && <p className="error-msg">{error}</p>}

      {totalItems > 0 && (
        <div className="user-table">
          <Table striped hover>
            <thead>
              <tr>
                <th>Status</th>
                <th>Ticket Id</th>
                <th>Description</th>
                <th>Assignee</th>
                <th>Priority</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {filtered.map((item) => (
                <tr key={item._id}>
                  <td className="text-center">
                    <Form.Select value={item.status} onChange={(e) => handleStatusChange(item._id, e.target.value)}>
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Closed">Closed</option>
                    </Form.Select>
                  </td>
                  <td>{item._id}</td>
                  <td>{item.description}</td>
                  <td>{item.assignee}</td>
                  <td>{item.priority}</td>
                  <td className="text-center">
                    <OverlayTrigger
                      key={`delete-${item._id}`}
                      placement="bottom"
                      overlay={<Tooltip id={`tooltip-delete-${item._id}`}>Delete Ticket</Tooltip>}
                    >
                      <i
                        className="bi bi-trash ms-3 text-danger"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteTicket(item._id)}
                      ></i>
                    </OverlayTrigger>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      <div className="d-flex justify-content-end relative bottom-20 me-3">
        <PaginationComponent
          total={response?.user?.length}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      <Modal show={showAddModal} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Add Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body><AddTicket /></Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={handleCloseAdd}>Close</button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>{selectedTicketId && <TicketEdit id={selectedTicketId} />}</Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={handleCloseEdit}>Close</button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TicketList;
