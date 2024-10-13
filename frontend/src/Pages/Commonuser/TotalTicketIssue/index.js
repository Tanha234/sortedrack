import React, { useEffect, useState } from "react";
import { axiosSecure } from "../../../api/axios";

const TotalIssueTicketsPage = () => {
  const [totalIssueTickets, setTotalIssueTickets] = useState(0); // State for total issue tickets

  useEffect(() => {
    const fetchTicketsData = async () => {
      try {
        const ticketsResponse = await axiosSecure.get("/tickets", {
          headers: {
            Authorization: `Bearer ${localStorage.userDetails && JSON.parse(localStorage.userDetails).token}`,
          },
        });

        if (ticketsResponse?.data?.tickets) {
          const totalIssues = ticketsResponse.data.tickets.filter(ticket => ticket.status === 'Issue').length;
          setTotalIssueTickets(totalIssues);
        }
      } catch (error) {
        console.error("Error fetching tickets data", error);
      }
    };

    fetchTicketsData();
  }, []);

  return (
    <div className="container">
      <h2 className="py-3">Total Issue Tickets</h2>
      <h1>{totalIssueTickets}</h1>
      {/* You can add more details or components as needed */}
    </div>
  );
};

export default TotalIssueTicketsPage;
