const express = require("express");
const router = express.Router();

const {
  getAllTickets,
  getSingleTicket,
  createTicket,
  updateTicket,
  deleteTicket,
  deleteAllTickets,
  getMyTickets,
} = require("../controllers/ticketControllers");

const {
  authenticateUser,
  authorizeRoles,
} = require("../middleware/authentication");

router
  .route("/")
  .get(
    [authenticateUser, authorizeRoles("superadmin", "admin", "user")],
    getAllTickets
  )
  .post(
    authenticateUser,
    authorizeRoles("superadmin", "admin", "user"),
    createTicket
  );

router
  .route("/deleteAllTickets")
  .delete(
    authenticateUser,
    authorizeRoles("superadmin", "admin"),
    deleteAllTickets
  );

router.route("/myTickets").get(authenticateUser, getMyTickets);
router
  .route("/:id")
  .get(authenticateUser, getSingleTicket)
  .patch(
    authenticateUser,
    authorizeRoles("superadmin", "admin", "user"),
    updateTicket
  )
  .delete(
    authenticateUser,
    authorizeRoles("superadmin", "admin"),
    deleteTicket
  );

module.exports = router;
