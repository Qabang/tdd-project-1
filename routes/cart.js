import express from 'express'
import Carts from '../models/cartModel.js'
const appCarts = express.Router()

appCarts.use(express.urlencoded({ extended: true }))
appCarts.use(express.json())

appCarts

  .get('/', async (req, res) => {
    const carts = await Carts.find({})
    try {
      res.send(carts)
    } catch (error) {
      res.status(500).send(error)
    }
  })


export default appCarts