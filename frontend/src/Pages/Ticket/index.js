import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [formData, setFormData] = useState({
    deviceType: '',
    issueDescription: '',
    contact: ''
  });
  const [error, setError] = useState(''); // State for error messages

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state before submitting

    try {
      // Send data to the backend
      const response = await axios.post('http://localhost:4000/api/tickets', formData);
      
      // Update tickets state with the new ticket
      setTickets([...tickets, response.data]);
      
      // Reset form
      setFormData({ deviceType: '', issueDescription: '', contact: '' });
    } catch (error) {
      console.error("There was an error submitting the ticket!", error);
      setError("Failed to create a ticket. Please try again."); // Set error message
    }
  };

  return (
    <div className="container mt-5">
      {/* Header Section */}
      <div className="text-center mb-5">
        <h1 className="display-4">Issue Ticketing System</h1>
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Ticket Form */}
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <div className="card shadow-lg">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Submit a Ticket</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="deviceType" className="form-label">Device Type</label>
                  <select
                    name="deviceType"
                    className="form-select"
                    value={formData.deviceType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select device</option>
                    <option value="Mouse">Mouse</option>
                    <option value="Keyboard">Keyboard</option>
                    <option value="Monitor">Monitor</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="issueDescription" className="form-label">Issue Description</label>
                  <textarea
                    name="issueDescription"
                    className="form-control"
                    rows="4"
                    value={formData.issueDescription}
                    onChange={handleChange}
                    required
                    placeholder="Describe the issue in detail..."
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="contact" className="form-label">Contact Info</label>
                  <input
                    name="contact"
                    type="text"
                    className="form-control"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                    placeholder="Your email or phone number"
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-block">
                    Submit Ticket
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Submitted Tickets Section */}
    </div>
  );
}

export default App;
