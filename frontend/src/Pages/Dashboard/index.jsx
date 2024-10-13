import React, { useState, useEffect } from "react";
import { axiosSecure } from "../../api/axios";
import "./dashboard.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicketAlt, faSpinner, faCheckCircle, faLaptop, faKeyboard, faTasks } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const [dashboardStats, setDashboardStats] = useState([]);
  const [totalTickets, setTotalTickets] = useState(0);
  const [openTickets, setOpenTickets] = useState(0);
  const [inProgressTickets, setInProgressTickets] = useState(0);
  const [closedTickets, setClosedTickets] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        // Fetch product data
        const productResponse = await axiosSecure.get("/product", {
          headers: {
            Authorization: `Bearer ${localStorage.userDetails && JSON.parse(localStorage.userDetails).token}`,
          },
        });

        if (productResponse?.data?.products) {
          const { products } = productResponse.data;

          const unAssignedSystemCount = products.filter(
            (product) => product.productCategory === "System" && product.tag === "notassigned"
          ).length;
          const assignedSystemCount = products.filter(
            (product) => product.productCategory === "System" && product.tag === "assigned"
          ).length;

          const unAssignedAccessoriesCount = products.filter(
            (product) => product.productCategory === "Accessories" && product.tag === "notassigned"
          ).length;

          const assignedAccessoriesCount = products.filter(
            (product) => product.productCategory === "Accessories" && product.tag === "assigned"
          ).length;

          setDashboardStats([
            {
              deviceCategory: "System",
              availableDevicesCount: unAssignedSystemCount,
              assignedDevicesCount: assignedSystemCount,
            },
            {
              deviceCategory: "Accessories",
              availableDevicesCount: unAssignedAccessoriesCount,
              assignedDevicesCount: assignedAccessoriesCount,
            },
          ]);
        }

        // Fetch tickets data
        const ticketsResponse = await axiosSecure.get("/tickets", {
          headers: {
            Authorization: `Bearer ${localStorage.userDetails && JSON.parse(localStorage.userDetails).token}`,
          },
        });

        if (ticketsResponse?.data?.total) {
          setTotalTickets(ticketsResponse.data.total);

          // Process ticket data for status counts
          const tickets = ticketsResponse.data.tickets || [];
          const openCount = tickets.filter(ticket => ticket.status === "Open").length;
          const inProgressCount = tickets.filter(ticket => ticket.status === "In Progress").length;
          const closedCount = tickets.filter(ticket => ticket.status === "Closed").length;

          setOpenTickets(openCount);
          setInProgressTickets(inProgressCount);
          setClosedTickets(closedCount);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="dashboard-container bg-light">
      <div className="main-content container py-5">
       

        {loading ? (
          <div className="loading-indicator text-center">
            <FontAwesomeIcon icon={faSpinner} spin size="3x" className="text-primary mb-3" />
            <p className="lead">Loading dashboard data...</p>
          </div>
        ) : (
          <>
            <div className="row mb-5">
              <div className="col-12 mb-4">
                <h2 className="section-title text-secondary">Welcome to Sortedrack</h2>
              </div>
              {dashboardStats?.length > 0 &&
                dashboardStats.map((stock, index) => (
                  <div className="col-xl-6 col-lg-6 col-md-6 mb-4" key={index}>
                    <div className="card stock-card shadow-sm border-0 h-100">
                      <div className="card-body d-flex flex-column">
                        <div className="d-flex align-items-center mb-3">
                          <FontAwesomeIcon icon={stock.deviceCategory === "System" ? faLaptop : faKeyboard} className="text-primary me-3" size="2x" />
                          <h3 className="card-title mb-0">{stock.deviceCategory}</h3>
                        </div>
                        <div className="row g-3 mt-auto">
                          <div className="col-sm-4">
                            <div className="p-3 bg-light rounded">
                              <h5 className="mb-0">Assigned</h5>
                              <h2 className="mt-2 mb-0 text-primary">{stock.assignedDevicesCount}</h2>
                            </div>
                          </div>
                          <div className="col-sm-4">
                            <div className="p-3 bg-light rounded">
                              <h5 className="mb-0">Available</h5>
                              <h2 className="mt-2 mb-0 text-success">{stock.availableDevicesCount}</h2>
                            </div>
                          </div>
                          <div className="col-sm-4">
                            <div className="p-3 bg-light rounded">
                              <h5 className="mb-0">Total</h5>
                              <h2 className="mt-2 mb-0 text-info">{stock.availableDevicesCount + stock.assignedDevicesCount}</h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="row mb-5">
 
  <div className="col-xl-6 col-lg-6 col-md-12 mb-4">
    <div className="card shadow-sm border-0 h-100 d-flex flex-column">
      <div className="card-body d-flex flex-column justify-content-between">
        <div className="d-flex align-items-center mb-4">
          <FontAwesomeIcon icon={faTasks} className="text-primary me-3" size="2x" />
          <h3 className="card-title mb-5 pb-4">Total Tickets</h3>
        </div>
        <h1 className="display-4 fw-bold text-center mb-4">{totalTickets}</h1>
      </div>
    </div>
  </div>
  <div className="col-xl-6 col-lg-6 col-md-12">
    <div className="card shadow-sm border-0 h-100 d-flex flex-column">
      <div className="card-body d-flex flex-column justify-content-between">
        <h3 className="card-title mb-4">Ticket Status</h3>
        <div className="row g-3">
          <div className="col-sm-4">
            <div className="p-3 bg-light rounded text-center">
              <FontAwesomeIcon icon={faTicketAlt} className="text-warning mb-2" size="2x" />
              <h5>Open</h5>
              <h3 className="mb-0">{openTickets}</h3>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="p-3 bg-light rounded text-center">
              <FontAwesomeIcon icon={faSpinner} className="text-info mb-2" size="2x" />
              <h5>In Progress</h5>
              <h3 className="mb-0">{inProgressTickets}</h3>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="p-3 bg-light rounded text-center">
              <FontAwesomeIcon icon={faCheckCircle} className="text-success mb-2" size="2x" />
              <h5>Closed</h5>
              <h3 className="mb-0">{closedTickets}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;