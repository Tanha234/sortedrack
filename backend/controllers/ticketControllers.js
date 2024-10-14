const Ticket = require("../models/tickets");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermission } = require("../utility");

const getAllTickets = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const tickets = await Ticket.find({}).skip(skip).limit(limit);
  const total = await Ticket.countDocuments(); // Get the total count of tickets

  res.status(StatusCodes.OK).json({ tickets, total });
};

const getSingleTicket = async (req, res) => {
  const { id: ticketId } = req.params;
  const ticket = await Ticket.findOne({ _id: ticketId });

  if (!ticket) {
    throw new CustomError.NotFoundError(`No ticket found with id ${ticketId}`);
  }

  res.status(StatusCodes.OK).json({ ticket });
};

const createTicket = async (req, res) => {
  const { title, description, priority, status, department, assignee, category, dueDate } = req.body;

  if (!title || !description || !priority || !status || !department) {
    throw new CustomError.BadRequestError("Please provide all required fields");
  }

  const ticket = await Ticket.create({
    title,
    description,
    priority,
    status,
    department,
    assignee: assignee || null,
    category: category || null,
    dueDate: dueDate ? new Date(dueDate) : null,
  });

  res.status(StatusCodes.CREATED).json({ ticket });
};

const updateTicket = async (req, res) => {
  const { id: ticketId } = req.params;
  const { title, description, priority, status, department, assignee, category, dueDate } = req.body;

  const ticket = await Ticket.findOne({ _id: ticketId });

  if (!ticket) {
    throw new CustomError.NotFoundError(`No ticket found with id ${ticketId}`);
  }

  // Update fields only if they are provided in the request
  ticket.title = title || ticket.title;
  ticket.description = description || ticket.description;
  ticket.priority = priority || ticket.priority;
  ticket.status = status || ticket.status;
  ticket.department = department || ticket.department;
  ticket.assignee = assignee || ticket.assignee;
  ticket.category = category || ticket.category;
  ticket.dueDate = dueDate ? new Date(dueDate) : ticket.dueDate;

  await ticket.save();

  res.status(StatusCodes.OK).json({ ticket });
};

const deleteTicket = async (req, res) => {
  const { id: ticketId } = req.params;

  const ticket = await Ticket.findOne({ _id: ticketId });
  if (!ticket) {
    throw new CustomError.NotFoundError(`No ticket found with id ${ticketId}`);
  }

  await Ticket.deleteOne({ _id: ticketId });
  res.status(StatusCodes.OK).json({ message: "Ticket deleted successfully" });
};

const deleteAllTickets = async (req, res) => {
  await Ticket.deleteMany({});
  res.status(StatusCodes.OK).json({ message: "All tickets deleted" });
};
const getMyTickets = async (req, res) => {
  const userId = req.user.userId; // Assuming req.user contains the authenticated user's info
  console.log(userId)
  const tickets = await Ticket.find();
  console.log(tickets)


  const alltickets = await Ticket.find({ createdBy: userId });
  const total = await Ticket.countDocuments({ assignee: userId });

  res.status(StatusCodes.OK).json({ tickets, total });
};

module.exports = {
  getAllTickets,
  getSingleTicket,
  createTicket,
  updateTicket,
  deleteTicket,
  deleteAllTickets,
  getMyTickets
};
