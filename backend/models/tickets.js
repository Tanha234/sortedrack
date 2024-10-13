// const mongoose = require("mongoose");
// const validator = require("validator");

// const ticketSchema = new mongoose.Schema(
//   {
//     description: {
//       type: String,
//       required: [true, "Ticket description is required"],
//       minlength: 5, // Minimum length can be adjusted as per requirements
//     },
//     priority: {
//       type: String,
//       required: [true, "Priority is required"],
//       enum: ["Low", "Medium", "High"],
//       default: "Medium", // Default priority can be adjusted
//     },
//     status: {
//       type: String,
//       required: [true, "Status is required"],
//       enum: ["Open", "In Progress", "Closed"],
//       default: "Open", // Default status can be adjusted
//     },
//     assignee: {
//       type: String,
//       default: null, // Optional field, can be null if not assigned
//     },
//     category: {
//       type: String,
//       default: null, // Optional field, can be null if not assigned
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Ticket", ticketSchema);

// const mongoose = require("mongoose");

// const ticketSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, "Ticket title is required"], // Add title validation
//     },
//     description: {
//       type: String,
//       required: [true, "Ticket description is required"],
//       minlength: 5, // Minimum length can be adjusted as per requirements
//     },
//     priority: {
//       type: String,
//       required: [true, "Priority is required"],
//       enum: ["Low", "Medium", "High"],
//       default: "Medium", // Default priority can be adjusted
//     },
//     status: {
//       type: String,
//       required: [true, "Status is required"],
//       enum: ["Open", "In Progress", "Closed"],
//       default: "Open", // Default status can be adjusted
//     },
//     department: {
//       type: String,
//       required: [true, "Department is required"], // Add department validation
//     },
//     assignee: {
//       type: String,
//       default: null, // Optional field, can be null if not assigned
//     },
//     category: {
//       type: String,
//       default: null, // Optional field, can be null if not assigned
//     },
//     dueDate: {
//       type: Date,
//       default: null, // Optional field, can be null if not assigned
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Ticket", ticketSchema);

// const mongoose = require("mongoose");

// const ticketSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, "Ticket title is required"],
//       trim: true,
//     },
//     description: {
//       type: String,
//       required: [true, "Ticket description is required"],
//       trim: true,
//     },
//     priority: {
//       type: String,
//       required: [true, "Priority is required"],
//       enum: ["Low", "Medium", "High"],
//       default: "Medium",
//     },
//     status: {
//       type: String,
//       required: [true, "Status is required"],
//       enum: ["Open", "In Progress", "Closed"],
//       default: "Open",
//     },
//     department: {
//       type: String,
//       required: [true, "Department is required"],
//       trim: true,
//     },
//     assignee: {
//       type: String,
//       trim: true,
//       default: null,
//     },
//     category: {
//       type: String,
//       trim: true,
//       default: null,
//     },
//     dueDate: {
//       type: Date,
//       default: null,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Ticket", ticketSchema);const mongoose = require("mongoose");

const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, required: true, enum: ['Low', 'Medium', 'High'] },
    status: { type: String, required: true, enum: ['Open', 'In Progress', 'Closed'] },
    department: { type: String, required: true },
    assignee: { type: String, default: null },
    category: { type: String, default: null },
    dueDate: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);