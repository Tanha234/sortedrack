// const Ticket = require("../models/tickets");
// const { StatusCodes } = require("http-status-codes");
// const CustomError = require("../errors");
// const { checkPermission } = require("../utility");

// const getAllTickets = async (req, res) => {
//   const page = Number(req.query.page) || 1;
//   const limit = Number(req.query.limit) || 10;
//   const skip = (page - 1) * limit;

//   let result = Ticket.find({}).skip(skip).limit(limit);
//   const tickets = await result;

//   res.status(StatusCodes.OK).json({ tickets, total: tickets.length });
// };

// const getSingleTicket = async (req, res) => {
//   const { id: ticketId } = req.params;
//   const ticket = await Ticket.findOne({ _id: ticketId });

//   if (!ticket) {
//     throw new CustomError.NotFoundError(`No ticket found with id ${ticketId}`);
//   }

//   checkPermission(req.user, ticket.assignee); // Assuming you want to check permissions based on the assignee

//   res.status(StatusCodes.OK).json({ ticket });
// };

// const createTicket = async (req, res) => {
//   const { description, priority, status, assignee, category } = req.body;

//   if (!description || !priority || !status) {
//     throw new CustomError.BadRequestError("Please provide all required fields");
//   }

//   const ticket = await Ticket.create({
//     title,
//     description,
//     priority,
//     status,
//     department,
//     assignee,
//     category,
//     dueDate,
//   });

//   res.status(StatusCodes.CREATED).json({ ticket });
// };

// const updateTicket = async (req, res) => {
//   const { id: ticketId } = req.params;
//   const { description, priority, status, assignee, category } = req.body;

//   const ticket = await Ticket.findOne({ _id: ticketId });

//   if (!ticket) {
//     throw new CustomError.NotFoundError(`No ticket found with id ${ticketId}`);
//   }

//   ticket.description = description || ticket.description;
//   ticket.priority = priority || ticket.priority;
//   ticket.status = status || ticket.status;
//   ticket.assignee = assignee || ticket.assignee;
//   ticket.category = category || ticket.category;

//   await ticket.save();

//   res.status(StatusCodes.OK).json({ ticket });
// };

// const deleteTicket = async (req, res) => {
//   const { id: ticketId } = req.params;
//   const ticket = await Ticket.findOne({ _id: ticketId });

//   if (!ticket) {
//     throw new CustomError.NotFoundError(`No ticket found with id ${ticketId}`);
//   }

//   await Ticket.deleteOne({ _id: ticketId });
//   res.status(StatusCodes.OK).json({ message: "Ticket deleted successfully" });
// };

// const deleteAllTickets = async (req, res) => {
//   await Ticket.deleteMany({});
//   res.status(StatusCodes.OK).json({ message: "All tickets deleted" });
// };

// module.exports = {
//   getAllTickets,
//   getSingleTicket,
//   createTicket,
//   updateTicket,
//   deleteTicket,
//   deleteAllTickets,
// };
// const Ticket = require("../models/tickets");
// const { StatusCodes } = require("http-status-codes");
// const CustomError = require("../errors");
// const { checkPermission } = require("../utility");

// const getAllTickets = async (req, res) => {
//   const page = Number(req.query.page) || 1;
//   const limit = Number(req.query.limit) || 10;
//   const skip = (page - 1) * limit;

//   let result = Ticket.find({}).skip(skip).limit(limit);
//   const tickets = await result;

//   res.status(StatusCodes.OK).json({ tickets, total: tickets.length });
// };

// const getSingleTicket = async (req, res) => {
//   const { id: ticketId } = req.params;
//   const ticket = await Ticket.findOne({ _id: ticketId });

//   if (!ticket) {
//     throw new CustomError.NotFoundError(`No ticket found with id ${ticketId}`);
//   }

//   checkPermission(req.user, ticket.assignee);

//   res.status(StatusCodes.OK).json({ ticket });
// };

// const createTicket = async (req, res) => {
//   const { title, description, priority, status, department, assignee, category, dueDate } = req.body;

//   if (!title || !description || !priority || !status || !department) {
//     throw new CustomError.BadRequestError("Please provide all required fields");
//   }

//   const ticket = await Ticket.create({
//     title,
//     description,
//     priority,
//     status,
//     department,
//     assignee,
//     category,
//     dueDate,
//   });

//   res.status(StatusCodes.CREATED).json({ ticket });
// };

// const updateTicket = async (req, res) => {
//   const { id: ticketId } = req.params;
//   const { title, description, priority, status, department, assignee, category, dueDate } = req.body;

//   const ticket = await Ticket.findOne({ _id: ticketId });

//   if (!ticket) {
//     throw new CustomError.NotFoundError(`No ticket found with id ${ticketId}`);
//   }

//   ticket.title = title || ticket.title;
//   ticket.description = description || ticket.description;
//   ticket.priority = priority || ticket.priority;
//   ticket.status = status || ticket.status;
//   ticket.department = department || ticket.department;
//   ticket.assignee = assignee || ticket.assignee;
//   ticket.category = category || ticket.category;
//   ticket.dueDate = dueDate || ticket.dueDate;

//   await ticket.save();

//   res.status(StatusCodes.OK).json({ ticket });
// };

// const deleteTicket = async (req, res) => {
//   const { id: ticketId } = req.params;
//   const ticket = await Ticket.findOne({ _id: ticketId });

//   if (!ticket) {
//     throw new CustomError.NotFoundError(`No ticket found with id ${ticketId}`);
//   }

//   await Ticket.deleteOne({ _id: ticketId });
//   res.status(StatusCodes.OK).json({ message: "Ticket deleted successfully" });
// };

// const deleteAllTickets = async (req, res) => {
//   await Ticket.deleteMany({});
//   res.status(StatusCodes.OK).json({ message: "All tickets deleted" });
// };

// module.exports = {
//   getAllTickets,
//   getSingleTicket,
//   createTicket,
//   updateTicket,
//   deleteTicket,
//   deleteAllTickets,
// };


const Ticket = require("../models/tickets");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermission } = require("../utility");

const getAllTickets = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  let result = Ticket.find({}).skip(skip).limit(limit);
  const tickets = await result;

  res.status(StatusCodes.OK).json({ tickets, total: tickets.length });
};

const getSingleTicket = async (req, res) => {
  const { id: ticketId } = req.params;
  const ticket = await Ticket.findOne({ _id: ticketId });

  if (!ticket) {
    throw new CustomError.NotFoundError(`No ticket found with id ${ticketId}`);
  }

  checkPermission(req.user, ticket.assignee);

  res.status(StatusCodes.OK).json({ ticket });
};

// const createTicket = async (req, res) => {
//   const { title, description, priority, status, department, assignee, category, dueDate } = req.body;

//   console.log("Received ticket data:", req.body); // Log received data

//   if (!title || !description || !priority || !status || !department) {
//     throw new CustomError.BadRequestError("Please provide all required fields");
//   }

//   try {
//     const ticket = await Ticket.create({
//       title,
//       description,
//       priority,
//       status,
//       department,
//       assignee: assignee || null,
//       category: category || null,
//       dueDate: dueDate ? new Date(dueDate) : null,
//     });

//     console.log("Created ticket:", ticket); // Log created ticket

//     res.status(StatusCodes.CREATED).json({ ticket });
//   } catch (error) {
//     console.error("Error creating ticket:", error);
//     throw new CustomError.BadRequestError("Error creating ticket: " + error.message);
//   }
// };
// const createTicket = async (req, res) => {
//   console.log("Received ticket data:", req.body);

//   const { title, description, priority, status, department, assignee, category, dueDate } = req.body;

//   if (!title || !description || !priority || !status || !department) {
//     throw new CustomError.BadRequestError("Please provide all required fields");
//   }

//   try {
//     const ticketData = {
//       title,
//       description,
//       priority,
//       status,
//       department,
//       assignee: assignee || null,
//       category: category || null,
//       dueDate: dueDate ? new Date(dueDate) : null,
//     };

//     console.log("Attempting to create ticket with data:", ticketData);

//     const ticket = await Ticket.create(ticketData);

//     console.log("Ticket after creation:", ticket.toObject());

//     // Fetch the ticket again to ensure all fields are returned
//     const fetchedTicket = await Ticket.findById(ticket._id).lean();

//     console.log("Fetched ticket:", fetchedTicket);

//     res.status(StatusCodes.CREATED).json({ ticket: fetchedTicket });
//   } catch (error) {
//     console.error("Error creating ticket:", error);
//     throw new CustomError.BadRequestError("Error creating ticket: " + error.message);
//   }
// };
// const updateTicket = async (req, res) => {
//   const { id: ticketId } = req.params;
//   const { title, description, priority, status, department, assignee, category, dueDate } = req.body;

//   console.log("Updating ticket. Received data:", req.body); // Log received data

//   const ticket = await Ticket.findOne({ _id: ticketId });

//   if (!ticket) {
//     throw new CustomError.NotFoundError(`No ticket found with id ${ticketId}`);
//   }

//   if (title) ticket.title = title;
//   if (description) ticket.description = description;
//   if (priority) ticket.priority = priority;
//   if (status) ticket.status = status;
//   if (department) ticket.department = department;
//   if (assignee ) ticket.assignee = assignee;
//   if (category ) ticket.category = category;
//   if (dueDate ) ticket.dueDate = dueDate ? new Date(dueDate) : null;

//   try {
//     await ticket.save();
//     console.log("Updated ticket:", ticket); // Log updated ticket
//     res.status(StatusCodes.OK).json({ ticket });
//   } catch (error) {
//     console.error("Error updating ticket:", error);
//     throw new CustomError.BadRequestError("Error updating ticket: " + error.message);
//   }
// };

// const deleteTicket = async (req, res) => {
//   const { id: ticketId } = req.params;
//   const ticket = await Ticket.findOne({ _id: ticketId });

//   if (!ticket) {
//     throw new CustomError.NotFoundError(`No ticket found with id ${ticketId}`);
//   }

//   await Ticket.deleteOne({ _id: ticketId });
//   res.status(StatusCodes.OK).json({ message: "Ticket deleted successfully" });
// };

// const deleteAllTickets = async (req, res) => {
//   await Ticket.deleteMany({});
//   res.status(StatusCodes.OK).json({ message: "All tickets deleted" });
// };

// module.exports = {
//   getAllTickets,
//   getSingleTicket,
//   createTicket,
//   updateTicket,
//   deleteTicket,
//   deleteAllTickets,
// };
const { StatusCodes } = require('http-status-codes'); // Ensure you're importing this for status codes
const CustomError = require('./custom-error'); // Adjust the import path based on your project structure
const Ticket = require('./models/Ticket'); // Adjust the import path based on your project structure

const createTicket = async (req, res) => {
  console.log("Received ticket data:", req.body);

  const { title, description, priority, status, department, assignee, category, dueDate } = req.body;

  // Check required fields
  if (!title || !description || !priority || !status || !department) {
    throw new CustomError.BadRequestError("Please provide all required fields");
  }

  try {
    const ticketData = {
      title,
      description,
      priority,
      status,
      department,
      assignee: assignee || null,
      category: category || null,
      dueDate: dueDate ? new Date(dueDate) : null,
    };

    console.log("Attempting to create ticket with data:", ticketData);

    const ticket = await Ticket.create(ticketData);

    // Fetch the ticket again to ensure all fields are returned
    const fetchedTicket = await Ticket.findById(ticket._id).lean();

    console.log("Fetched ticket:", fetchedTicket);

    res.status(StatusCodes.CREATED).json({ ticket: fetchedTicket });
  } catch (error) {
    console.error("Error creating ticket:", error);
    throw new CustomError.BadRequestError("Error creating ticket: " + error.message);
  }
};

const updateTicket = async (req, res) => {
  const { id: ticketId } = req.params;
  const { title, description, priority, status, department, assignee, category, dueDate } = req.body;

  console.log("Updating ticket. Received data:", req.body); // Log received data

  try {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new CustomError.NotFoundError(`No ticket found with id ${ticketId}`);
    }

    // Update fields only if they are provided in the request
    if (title) ticket.title = title;
    if (description) ticket.description = description;
    if (priority) ticket.priority = priority;
    if (status) ticket.status = status;
    if (department) ticket.department = department;
    if (assignee) ticket.assignee = assignee;
    if (category) ticket.category = category;
    if (dueDate) ticket.dueDate = dueDate ? new Date(dueDate) : null;

    await ticket.save();
    console.log("Updated ticket:", ticket); // Log updated ticket
    res.status(StatusCodes.OK).json({ ticket });
  } catch (error) {
    console.error("Error updating ticket:", error);
    throw new CustomError.BadRequestError("Error updating ticket: " + error.message);
  }
};

const deleteTicket = async (req, res) => {
  const { id: ticketId } = req.params;

  try {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new CustomError.NotFoundError(`No ticket found with id ${ticketId}`);
    }

    await Ticket.deleteOne({ _id: ticketId });
    res.status(StatusCodes.OK).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    console.error("Error deleting ticket:", error);
    throw new CustomError.BadRequestError("Error deleting ticket: " + error.message);
  }
};

const deleteAllTickets = async (req, res) => {
  try {
    await Ticket.deleteMany({});
    res.status(StatusCodes.OK).json({ message: "All tickets deleted" });
  } catch (error) {
    console.error("Error deleting all tickets:", error);
    throw new CustomError.BadRequestError("Error deleting tickets: " + error.message);
  }
};

module.exports = {
  createTicket,
  updateTicket,
  deleteTicket,
  deleteAllTickets,
};
