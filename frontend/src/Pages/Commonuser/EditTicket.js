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
import { Toaster } from "../../component/Toaster/Toaster";

const EditTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showToaster, setShowToaster] = useState(false);
  const [response, error, loading, axiosFetch] = useAxios();
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    axiosFetch({
      axiosInstance: axiosSecure,
      method: "GET",
      url: `/ticket/${id}`,
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
  }, []);

  useEffect(() => {
    if (response?.ticket) {
      const { title, description, priority, status, department, assignee, category, dueDate } = response?.ticket;
      setInitialValues({
        title: title,
        description: description,
        priority: priority,
        status: status,
        department: department,
        assignee: assignee,
        category: category,
        dueDate: dueDate?.split("T")[0],  // Formatting the date to YYYY-MM-DD
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
              url: `/ticket/updateTicket/${id}`,
              requestConfig: [
                {
                  title: values.title,
                  description: values.description,
                  priority: values.priority,
                  status: values.status,
                  department: values.department,
                  assignee: values.assignee,
                  category: values.category,
                  dueDate: values.dueDate,
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
            navigate("/ticket", { replace: true });
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
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <Container className="edit-ticket-page d-flex justify-content-center flex-column">
                <h2 className="mb-4">Edit Ticket</h2>
                <Row>
                  <Col md={6} lg={6} xl={6}>
                    <FloatingLabel controlId="floatingTitle" label="Title" className="mb-3">
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
                  <Col md={6} lg={6} xl={6}>
                    <FloatingLabel controlId="floatingPriority" label="Priority" className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Priority"
                        name="priority"
                        value={values.priority}
                        onChange={handleChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col md={12} lg={12} xl={12}>
                    <FloatingLabel controlId="floatingDescription" label="Description" className="mb-3">
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
                  <Col md={6} lg={6} xl={6}>
                    <FloatingLabel controlId="floatingStatus" label="Status" className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Status"
                        name="status"
                        value={values.status}
                        onChange={handleChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col md={6} lg={6} xl={6}>
                    <FloatingLabel controlId="floatingDueDate" label="Due Date" className="mb-3">
                      <Form.Control
                        type="date"
                        placeholder="Due Date"
                        name="dueDate"
                        value={values.dueDate}
                        onChange={handleChange}
                      />
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
        to="ticket"
      ></Toaster>
    </div>
  );
};

export default EditTicket;
