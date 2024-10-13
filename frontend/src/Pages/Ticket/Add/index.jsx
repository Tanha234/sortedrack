// import React, { useState } from "react";
// import { Formik } from "formik";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import FloatingLabel from "react-bootstrap/FloatingLabel";
// import * as yup from "yup";
// import { axiosSecure } from "../../../api/axios";
// import { Toaster } from "../../../component/Toaster/Toaster";
// import "./users.scss"; // Ensure this path is correct

// const schema = yup.object().shape({
//   description: yup.string().required("Description is required"),
//   priority: yup.string().required("Priority is required"),
//   status: yup.string().required("Status is required"),
// });

// const handleOnSubmit = (values) =>
//   axiosSecure.post(
//     "/tickets",
//     {
//       description: values.description,
//       priority: values.priority,
//       status: values.status,
//       assignee: values.assignee,
//       category: values.category,
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${localStorage.userDetails && JSON.parse(localStorage.userDetails).token}`,
//       },
//     }
//   );

// const AddTicket = () => {
//   const [showAddToaster, setShowAddToaster] = useState(false);
//   const [showErrorToaster, setShowErrorToaster] = useState(false);
//   const [error, setError] = useState("");

//   return (
//     <div className="flex-grow-1">
//       <Formik
//         validationSchema={schema}
//         initialValues={{
//           description: "",
//           priority: "",
//           status: "Open", // Default status
//           assignee: "",
//           category: "",
//         }}
//         onSubmit={async (values, { setSubmitting }) => {
//           try {
//             const response = await handleOnSubmit(values);
//             if (response.status === 201) {
//               setShowAddToaster(true);
//             }
//           } catch (errorMsg) {
//             setError(errorMsg.response.data.msg);
//             setShowErrorToaster(true);
//           }
//           setSubmitting(false);
//         }}
//       >
//         {({
//           values,
//           errors,
//           touched,
//           handleChange,
//           handleSubmit,
//           isSubmitting,
//         }) => (
//           <Form onSubmit={handleSubmit}>
//             <Container className="add-ticket-page d-flex flex-column justify-content-center">
//               <h2 className="mb-4">Add Ticket</h2>
//               <Row>
//                 <Col md={12} lg={12}>
//                   <FloatingLabel
//                     controlId="floatingDescription"
//                     label="Ticket Description"
//                     className="mb-3"
//                   >
//                     <Form.Control
//                       as="textarea"
//                       placeholder="Description"
//                       name="description"
//                       value={values.description}
//                       onChange={handleChange}
//                       isInvalid={touched.description && !!errors.description}
//                     />
//                     <div className="invalid-feedback">
//                       {errors.description && touched.description && errors.description}
//                     </div>
//                   </FloatingLabel>
//                 </Col>

//                 <Col md={6} lg={6}>
//                   <FloatingLabel>
//                     <Form.Select
//                       name="priority"
//                       aria-label="Select Priority"
//                       className="select-padding" // Add padding class here
//                       isInvalid={!!touched.priority && !!errors.priority}
//                       value={values.priority}
//                       onChange={handleChange}
//                     >
//                       <option value="" disabled hidden>Select Priority</option>
//                       <option value="Low">Low</option>
//                       <option value="Medium">Medium</option>
//                       <option value="High">High</option>
//                     </Form.Select>
//                     <label htmlFor="floatingSelect">Priority</label>
//                     <div className="invalid-feedback">
//                       {touched.priority && errors.priority}
//                     </div>
//                   </FloatingLabel>
//                 </Col>

//                 <Col md={6} lg={6}>
//                   <FloatingLabel>
//                     <Form.Select
//                       name="status"
//                       aria-label="Select Status"
//                       isInvalid={!!touched.status && !!errors.status}
//                       value={values.status}
//                       onChange={handleChange}
//                     >
//                       <option value="Open">Open</option>
//                       <option value="In Progress">In Progress</option>
//                       <option value="Closed">Closed</option>
//                     </Form.Select>
//                     <label htmlFor="floatingSelect">Status</label>
//                     <div className="invalid-feedback">
//                       {touched.status && errors.status}
//                     </div>
//                   </FloatingLabel>
//                 </Col>

//                 <Col md={6} lg={6}>
//                   <FloatingLabel
//                     controlId="floatingAssignee"
//                     label="Assignee (optional)"
//                     className="mb-3"
//                   >
//                     <Form.Control
//                       type="text"
//                       placeholder="Assignee"
//                       name="assignee"
//                       value={values.assignee}
//                       onChange={handleChange}
//                     />
//                   </FloatingLabel>
//                 </Col>

//                 <Col md={6} lg={6}>
//                   <FloatingLabel
//                     controlId="floatingCategory"
//                     label="Category (optional)"
//                     className="mb-3"
//                   >
//                     <Form.Control
//                       type="text"
//                       placeholder="Category"
//                       name="category"
//                       value={values.category}
//                       onChange={handleChange}
//                     />
//                   </FloatingLabel>
//                 </Col>
//               </Row>
//               <Col md={12} lg={12} className="mt-4 mb-4">
//                 <Button type="submit" disabled={isSubmitting}>
//                   CREATE TICKET
//                 </Button>
//               </Col>
//             </Container>
//           </Form>
//         )}
//       </Formik>
//       <Toaster
//         title="Ticket created successfully"
//         bg="success"
//         showToaster={showAddToaster}
//         setShowToaster={setShowAddToaster}
//         to="tickets"
//       />
//       <Toaster
//         title={error}
//         bg="danger"
//         showToaster={showErrorToaster}
//         setShowToaster={setShowErrorToaster}
//         to="tickets/add"
//       />
//     </div>
//   );
// };

// export default AddTicket;

// AddTicket.js
import React, { useState } from "react";
import { Formik } from "formik";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import * as yup from "yup";
import { axiosSecure } from "../../../api/axios";
import { Toaster } from "../../../component/Toaster/Toaster";
import "./users.scss";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  priority: yup.string().required("Priority is required"),
  status: yup.string().required("Status is required"),
  department: yup.string().required("Department is required"),
  dueDate: yup.date().nullable(),
  assignee: yup.string().nullable(),
  category: yup.string().nullable(),
});

const handleOnSubmit = async (values) => {
  console.log("Submitting values:", values); 
  try {
    const response = await axiosSecure.post(
      "/tickets",
      {
        title: values.title,
        description: values.description,
        priority: values.priority,
        status: values.status,
        department: values.department,
        assignee: values.assignee || null,
        category: values.category || null,
        dueDate: values.dueDate || null,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.userDetails && JSON.parse(localStorage.userDetails).token}`,
        },
      }
    );
    console.log("Response data:", response.data); // Log response data
    return response;
  } catch (error) {
    console.error("Error submitting ticket:", error.response ? error.response.data : error.message);
    throw error;
  }
};

const AddTicket = () => {
  const [showAddToaster, setShowAddToaster] = useState(false);
  const [showErrorToaster, setShowErrorToaster] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="os-window">
      <div className="os-titlebar">
        <span className="os-title">Add New Ticket</span>
      </div>
      <div className="os-content">
        <Formik
          validationSchema={schema}
          initialValues={{
            title: "",
            description: "",
            priority: "",
            status: "Open",
            department: "",
            dueDate: null,
            assignee: "",
            category: "",
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              console.log("Submitting form with values:", values);
              const response = await handleOnSubmit(values);
              if (response.status === 201) {
                setShowAddToaster(true);
                resetForm();
              }
            } catch (errorMsg) {
              console.error("Error submitting form:", errorMsg);
              setError(errorMsg.response?.data?.msg || "An error occurred while creating the ticket");
              setShowErrorToaster(true);
            }
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Container>
                <Row>
                  <Col md={12} className="mb-3">
                    <Card className="os-card">
                      <Card.Body>
                        <Card.Title>Ticket Information</Card.Title>
                        <Form.Group className="mb-3">
                          <Form.Label>Title</Form.Label>
                          <Form.Control
                            type="text"
                            name="title"
                            value={values.title}
                            onChange={handleChange}
                            isInvalid={touched.title && !!errors.title}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.title}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={values.description}
                            onChange={handleChange}
                            isInvalid={touched.description && !!errors.description}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.description}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col md={6} className="mb-3">
                    <Card className="os-card">
                      <Card.Body>
                        <Card.Title>Ticket Details</Card.Title>
                        <Form.Group className="mb-3">
                          <Form.Label>Priority</Form.Label>
                          <Form.Select
                            name="priority"
                            value={values.priority}
                            onChange={handleChange}
                            isInvalid={touched.priority && !!errors.priority}
                          >
                            <option value="">Select Priority</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            {errors.priority}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Status</Form.Label>
                          <Form.Select
                            name="status"
                            value={values.status}
                            onChange={handleChange}
                            isInvalid={touched.status && !!errors.status}
                          >
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Closed">Closed</option>
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            {errors.status}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Department</Form.Label>
                          <Form.Control
                            type="text"
                            name="department"
                            value={values.department}
                            onChange={handleChange}
                            isInvalid={touched.department && !!errors.department}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.department}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col md={6} className="mb-3">
                    <Card className="os-card">
                      <Card.Body>
                        <Card.Title>Additional Information</Card.Title>
                        <Form.Group className="mb-3">
                          <Form.Label>Due Date</Form.Label>
                          <Form.Control
                            type="date"
                            name="dueDate"
                            value={values.dueDate}
                            onChange={handleChange}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Assignee</Form.Label>
                          <Form.Control
                            type="text"
                            name="assignee"
                            value={values.assignee}
                            onChange={handleChange}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Category</Form.Label>
                          <Form.Control
                            type="text"
                            name="category"
                            value={values.category}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <Row>
                  <Col className="text-center mt-4">
                    <Button type="submit" className="os-button" disabled={isSubmitting}>
                      Create Ticket
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Form>
          )}
        </Formik>
      </div>
      <Toaster
        title="Ticket created successfully"
        bg="success"
        showToaster={showAddToaster}
        setShowToaster={setShowAddToaster}
        to="tickets"
      />
      <Toaster
        title={error}
        bg="danger"
        showToaster={showErrorToaster}
        setShowToaster={setShowErrorToaster}
        to="tickets/add"
      />
    </div>
  );
};

export default AddTicket;