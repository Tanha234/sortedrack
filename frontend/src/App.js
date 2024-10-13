import React from "react";
import { Routes, Route } from "react-router-dom";

import StockProvider from "./contexts/StockContext";
import {
  Layout,
  LoginForm,
  PageNotFound,
  Dashboard,
  Allitems,
  Request,
  AddUser,
  ListUser,
  EditUser,
  ListStock,
  AddStock,
  EditSystemDetails,
} from "./Pages";

import AssignItem from "./Pages/AssignItems";
import Ticketlist from "./Pages/Ticket/List";
import TicketAdd from "./Pages/Ticket/Add";
import TicketEdit from "./Pages/Ticket/Edit";
import CommonUser from "./Pages/Commonuser"
import CheckStatus from "./Pages/Commonuser/CheckStatus"
import EditTicket from "./Pages/Commonuser/EditTicket"


function App() {
  return (
    <StockProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="stock" element={<ListStock />} />
          <Route path="stock/add" element={<AddStock />} />
          <Route path="stock/edit/:id" element={<EditSystemDetails />} />
          <Route path="allitems" element={<Allitems />} />
          <Route path="request" element={<Request />} />
          <Route path="user/add" element={<AddUser />} />
          <Route path="user" element={<ListUser />} />
          <Route path="user/edit/:id" element={<EditUser />} />
          <Route path="assigned/" element={<AssignItem />} />
          <Route path="tickets/" element={<Ticketlist/>} />
          <Route path="tickets/add" element={<TicketAdd/>} />
          <Route path="tickets/edit/:id" element={<TicketEdit/>} />
          <Route path="common" element={<CommonUser/>} />
          <Route path="checkStatus" element={<CheckStatus/>} />
          <Route path="editTicket/:id" element={<EditTicket/>} />
          
       
        </Route>

        <Route path="login" element={<LoginForm />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </StockProvider>
  );
}

export default App;
