import React, { useEffect, useState, useMemo } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { axiosSecure } from "../../../api/axios";
import useAxios from "../../../Hooks/useAxios";
import "./listUser.scss";
import PaginationComponent from "../../../component/Pagination/Pagination";

const ListUser = () => {
  const [response, error, loading, axiosFetch] = useAxios();
  const [search, setSearch] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const fetchUserDetails = async () => {
    axiosFetch({
      axiosInstance: axiosSecure,
      method: "GET",
      url: "/user",
      requestConfig: [
        {
          headers: {
            Authorization: `Bearer ${
              localStorage.userDetails &&
              JSON.parse(localStorage.userDetails).token
            }`,
          },
        },
      ],
    });
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleStatusToggle = async (user) => {
    await axiosSecure.patch(
      `/user/updateuser/${user._id}`,
      {
        ...user,
        status: user.status === "active" ? "inactive" : "active",
      },
      {
        headers: {
          Authorization: `Bearer ${
            localStorage.userDetails &&
            JSON.parse(localStorage.userDetails).token
          }`,
        },
      }
    );
    fetchUserDetails();
  };

  const filtered = useMemo(() => {
    let filteredResult = response?.user?.sort((a, b) =>
      a.fname.localeCompare(b.fname)
    );
    setTotalItems(filteredResult?.length);

    if (search) {
      filteredResult = filteredResult.filter(
        (currentItem) =>
          currentItem.fname.toLowerCase().includes(search.toLowerCase()) ||
          currentItem.username.toLowerCase().includes(search.toLowerCase())
      );
    }
    return filteredResult?.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [currentPage, response, search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Container fluid className="py-4 px-4" style={{ backgroundColor: "#f8f9fa" }}>
      <Card className="shadow-sm">
        <Card.Body>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
  <h2 className="mb-3 mb-md-0">User Management</h2>
  <div className="d-flex flex-column flex-md-row align-items-md-center">
    <InputGroup className="mb-3 mb-md-0 me-md-3" style={{ width: "300px" }}>
      <InputGroup.Text id="basic-addon1">
        <i className="bi bi-search"></i>
      </InputGroup.Text>
      <Form.Control
        onChange={handleSearch}
        type="text"
        placeholder="Search users..."
        aria-label="Search"
        aria-describedby="basic-addon1"
      />
    </InputGroup>
    <Button 
      as={Link} 
      to="/user/add" 
      variant="primary" 
      size="lg"
      className="d-flex align-items-center justify-content-center"
      style={{ minWidth: "180px" }}
    >
      <i className="bi bi-plus-circle me-2"></i>
      <span>Add New User</span>
    </Button>
  </div>
</div>
          
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2 text-muted">Loading users...</p>
            </div>
          )}
          
          {!loading && error && (
            <Alert variant="danger">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
            </Alert>
          )}

          {totalItems > 0 && (
            <div className="user-table table-responsive">
              <Table hover className="align-middle">
                <thead className="bg-light">
                  <tr>
                    <th className="py-3">Status</th>
                    <th className="py-3">Name</th>
                    <th className="py-3">Email</th>
                    <th className="py-3">Branch</th>
                    <th className="py-3">Role</th>
                    <th className="py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered?.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <Form.Check
                          type="switch"
                          id={`custom-switch-${item._id}`}
                          defaultChecked={item.status === "active"}
                          onClick={() => handleStatusToggle(item)}
                        />
                      </td>
                      <td>
                        <div>
                          <div>{`${item.fname} ${item.lname}`}</div>
                          <small className="text-muted">{item.username}</small>
                        </div>
                      </td>
                      <td>{item.email}</td>
                      <td>{item.branch}</td>
                      <td>
                        <Badge bg={item.role === 'admin' ? 'primary' : 'secondary'} pill>
                          {item.role}
                        </Badge>
                      </td>
                      <td className="text-center">
                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip>Edit User</Tooltip>}
                        >
                          <Button as={Link} to={`/user/edit/${item._id}`} variant="outline-primary" size="sm" className="me-2">
                            <i className="bi bi-pencil"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip>Delete User</Tooltip>}
                        >
                          <Button variant="outline-danger" size="sm">
                            <i className="bi bi-trash"></i>
                          </Button>
                        </OverlayTrigger>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
          
          <div className="d-flex justify-content-between align-items-center mt-4">
            <p className="mb-0 text-muted">
              Showing {filtered?.length} out of {totalItems} users
            </p>
            <PaginationComponent
              total={response?.user?.length}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ListUser;