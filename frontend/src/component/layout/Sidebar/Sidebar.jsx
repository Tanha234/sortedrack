import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { SidebarContext } from "../../../contexts/SidebarContext";
import logo from "../../../assests/images/sorted-rack-logo.svg";
import "./Sidebar.scss";
import { getUserDetails } from "../../../service";

const Sidebar = () => {
  const { activeMenu } = useContext(SidebarContext);
  const { role } = getUserDetails();
  console.log(role);

  const userLinks = [
    {
      to: "/common",
      label: "Ticket",
      icon: "bi bi-people",
    },
  ];

  const adminLinks = [
    {
      to: "/",
      label: "Dashboard",
      icon: "bi bi-house-door",
    },
    {
      to: "/stock",
      label: "Stock",
      icon: "bi bi-clipboard-check",
    },
    {
      to: "/assigned",
      label: "Assigned Devices",
      icon: "bi bi-person-check",
    },
    {
      to: "/user",
      label: "User",
      icon: "bi bi-people",
    },
    {
      to: "/tickets",
      label: "Tickets",
      icon: "bi bi-ticket",
    },
  ];

  const superAdminLinks = [
    {
      to: "/",
      label: "Dashboard",
      icon: "bi bi-house-door",
    },
    {
      to: "/stock",
      label: "Stock",
      icon: "bi bi-clipboard-check",
    },
    {
      to: "/user",
      label: "User",
      icon: "bi bi-people",
    },
    {
      to: "/tickets",
      label: "Tickets",
      icon: "bi bi-ticket",
    },
    {
      to: "/common",
      label: "Common Tasks",
      icon: "bi bi-list-check",
    },
    
  ];

  const renderLinks = (links) =>
    links.map((link) => (
      <li key={link.to}>
        <NavLink
          to={link.to}
          className={({ isActive }) => `nav-link text-white ${isActive ? "active" : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className={`${link.icon} pe-none me-2`}
            viewBox="0 0 16 16"
          />
          <span>{link.label}</span>
        </NavLink>
      </li>
    ));

  return (
    <div className={activeMenu ? "sidebar d-flex bg-dark hide" : "sidebar d-flex bg-dark"}>
      <div className="d-flex flex-column flex-shrink-0 px-3 text-white w-100">
        <a href="/" className="d-flex align-items-center pt-3 mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <img alt="Sorted Rack" src={logo} width="140px" />
        </a>
        <hr />
        <nav className="h-100vh">
          <ul className="nav nav-pills flex-column mb-auto">
            {role === "user" ? renderLinks(userLinks) : renderLinks(adminLinks) }
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
