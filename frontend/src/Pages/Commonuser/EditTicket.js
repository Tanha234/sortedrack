import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useParams, useNavigate } from "react-router-dom";
import { axiosSecure } from "../../api/axios";
import useAxios from "../../Hooks/useAxios";
import "./Edit.scss";
import { Toaster } from "../../../src/component/Toaster/Toaster";

const TicketEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showToaster, setShowToaster] = useState(false);
  const [response, error, loading, axiosFetch] = useAxios();
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    // Fetch the ticket details based on the ID
    axiosFetch({
      axiosInstance: axiosSecure,
      method: "GET",
      url: `/tickets/${id}`,
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
  }, [id, axiosFetch]);

  useEffect(() => {
    if (response) {
      // Set initial values based on the ticket response
      const { title, description, status } = response;
      setInitialValues({
        title: title,
        description: description,
        status: status,
      });
    }
  }, [response]);

  return (
    <div className="flex-grow-1">
      {Object.keys(initialValues).length > 0 && (
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            const errors = {};
            if (!values.title) {
              errors.title = "Title is mandatory";
            }
            if (!values.description) {
              errors.description = "Description is mandatory";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            axiosFetch({
              axiosInstance: axiosSecure,
              method: "PATCH",
              url: `/tickets/${id}`, // Update ticket endpoint
              requestConfig: [
                {
                  title: values.title,
                  description: values.description,
                  status: values.status,
                },
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
            setSubmitting(false);
            setShowToaster(true);
            navigate("/tickets"); // Redirect to ticket list after update
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <Container className="edit-user-page d-flex justify-content-center flex-column">
                <h2 className="mb-4">Edit Ticket</h2>
                <Row>
                  <Col md={12} lg={12} xl={12}>
                    <FloatingLabel
                      controlId="floatingTitle"
                      label="Title"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                      />
                      <p className="errorMsg">{errors.title}</p>
                    </FloatingLabel>
                  </Col>
                  <Col md={12} lg={12} xl={12}>
                    <FloatingLabel
                      controlId="floatingDescription"
                      label="Description"
                      className="mb-3"
                    >
                      <Form.Control
                        as="textarea"
                        placeholder="Description"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                      />
                      <p className="errorMsg">{errors.description}</p>
                    </FloatingLabel>
                  </Col>
                  <Col md={12} lg={12} xl={12} className="mt-4 mb-4 ">
                    <Button type="submit" disabled={isSubmitting}>
                      UPDATE TICKET
                    </Button>
                  </Col>
                </Row>
              </Container>
            </form>
          )}
        </Formik>
      )}
      <Toaster
        title="Ticket updated successfully"
        bg="success"
        showToaster={showToaster}
        setShowToaster={setShowToaster}
        to="/tickets" // Redirect to tickets after success
      />
    </div>
  );
};

export default TicketEdit;
