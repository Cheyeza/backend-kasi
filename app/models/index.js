const mongoose = require("mongoose")
const dbConfig = require("../config/db.config")
mongoose.Promise = global.Promise

const db ={};
db.mongoose = mongoose
db.user = require("./user.model")
db.role = require("./role.model")
db.products = require ("./product.models")(mongoose)
db.cart = require ("./cart.models")(mongoose)
db.url = dbConfig.url
db.ROLES = ["user","admin"]

module.exports = db