import express from 'express'
import Carts from '../models/cartsModel.js'
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
  .post('/', async (req, res) => {
    const cart = new Carts(req.body)

    try {
      await cart.save()
      res.send({ created: true })
    } catch (error) {
      res.status(500).send(error)
    }
  })


export default appCarts