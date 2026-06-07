const product = require('../models/product')


// ADD PRODUCT

const addproducts = async (req, res) => {

    const { name, price, brand, description, image } = req.body

    try {

        const newdata = new product({
            name,
            price,
            brand,
            description,
            image
        })

        await newdata.save()

        res.status(200).json({
            msg: "created successfully",
            data: newdata
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            msg: "server error"
        })
    }
}


// GET ALL PRODUCTS

const getproducts = async (req, res) => {

    try {

        const data = await product.find()

        res.status(200).json(data)

    } catch (error) {

        console.log(error)

        res.status(500).json({
            msg: "server error"
        })
    }
}


// GET SINGLE PRODUCT

const getsingleproduct = async (req, res) => {

    try {

        const data = await product.findById(req.params.id)

        res.status(200).json(data)

    } catch (error) {

        console.log(error)

        res.status(500).json({
            msg: "server error"
        })
    }
}


// DELETE PRODUCT

const deleteproduct = async (req, res) => {
    try {

        await product.findByIdAndDelete(req.params.id)

        res.status(200).json({
            msg: "product deleted successfully"
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            msg: "server error"
        })
    }
}


module.exports = {
    addproducts,
    getproducts,
    getsingleproduct,
    deleteproduct
}