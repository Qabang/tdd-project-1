import express from 'express'
import Carts from '../models/cartsModel.js'
const appCarts = express.Router()

appCarts.use(express.urlencoded({ extended: true }))
appCarts.use(express.json())

appCarts

  // GET all Carts in DB.
  .get('/', async (req, res) => {
    const carts = await Carts.find({})
    try {
      res.send(carts)
    } catch (error) {
      res.status(500).send(error)
    }
  })

  // GET all carts for the user with the specific userLogin.
  .get('/:userLogin', async (req, res) => {
    const userLogin = req.params.userLogin
    const carts = await Carts.find({ userLogin: userLogin })
    try {
      res.send(carts)
    } catch (error) {
      res.status(500).send(error)
    }
  })

  // POST to carts for the user with the specific userLogin.
  .post('/:userLogin', async (req, res) => {
    const cart = new Carts(req.body)

    try {
      await cart.save()
      res.send({ created: true })
    } catch (error) {
      res.status(500).send(error)
    }
  })

  // Delete one item from the cart for the user.
  .delete('/:userLogin/:itemId', async (req, res) => {
    const { userLogin, itemId } = req.params
    try {
      await Carts.deleteOne({
        _id: itemId,
        userLogin: userLogin,
      })

      res.status(200).send({ deleted: true })
    } catch (err) {
      console.error('Error DELETE /product', err)
      res.status(501).send('SERVER ERROR')
    }
  })

export default appCarts
