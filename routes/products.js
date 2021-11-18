import express from 'express'
import products from '../storage/products.js'
const appProducts = express.Router()

// Landingpage.
appProducts.get('/products', async (req, res) => {
  res.send(products)
})

export default appProducts
