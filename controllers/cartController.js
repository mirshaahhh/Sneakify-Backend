const cart = require('../models/cart')


// ADD TO CART

const addtocart = async (req, res) => {

    const {
        productId,
        name,
        price,
        image
    } = req.body

    try {

        const existing = await cart.findOne({
            productId,
            userId: req.user
        })

        if (existing) {

            existing.quantity += 1

            await existing.save()

            return res.status(200).json({
                msg: "quantity updated",
                data: existing
            })
        }

        const newcart = new cart({

            userId: req.user,

            productId,
            name,
            price,
            image
        })

        await newcart.save()

        res.status(200).json({
            msg: "added to cart",
            data: newcart
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            msg: "server error"
        })
    }
}


// GET USER CART

const getcart = async (req, res) => {

    try {

        const data = await cart.find({
            userId: req.user
        })

        res.status(200).json(data)

    } catch (error) {

        console.log(error)

        res.status(500).json({
            msg: "server error"
        })
    }
}


// REMOVE CART ITEM

const removecart = async (req, res) => {

    try {

        await cart.findByIdAndDelete(req.params.id)

        res.status(200).json({
            msg: "item removed"
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            msg: "server error"
        })
    }
}

module.exports = {
    addtocart,
    getcart,
    removecart
}