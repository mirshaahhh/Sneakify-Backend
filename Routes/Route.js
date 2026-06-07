const express = require('express')

const Router = express.Router()

const controllers = require('../controllers/controllers')


// ADD PRODUCT
Router.post('/addproducts', controllers.addproducts)


// GET ALL PRODUCTS
Router.get('/getproducts', controllers.getproducts)


// GET SINGLE PRODUCT
Router.get('/getproduct/:id', controllers.getsingleproduct)


// DELETE PRODUCT
Router.delete('/deleteproduct/:id', controllers.deleteproduct)


module.exports = Router