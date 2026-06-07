const express = require('express')

const Router = express.Router()

const authcontrollers = require('../controllers/authController')


// SIGNUP
Router.post('/signup', authcontrollers.signup)


// LOGIN
Router.post('/login', authcontrollers.login)


module.exports = Router