import express from 'express'
import Products from '../storage/products.js'
const appProducts = express.Router()

// Landingpage.
appProducts
  .get('/products', async (req, res) => {
    res.send(Products)
  })
  .get('/products/:id', async (req, res) => {
    const id = req.params.id
    try {
      const Product = Products.find((item) => item.id === id)
      console.log(Product)
      res.send(Product)
    } catch (err) {
      console.error('Error GET /products/id', err)
      res.status(501).send(SERVER_ERROR)
    }
  })

export default appProducts
