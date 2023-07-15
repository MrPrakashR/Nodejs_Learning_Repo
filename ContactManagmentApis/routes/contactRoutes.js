const express = require("express")
const routes = express.Router()
const {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
} = require("../controllers/contactController")

routes.route("/").get(getContacts).post(createContact)
routes.route("/:id").get(getContact).put(updateContact).delete(deleteContact)

module.exports = routes
