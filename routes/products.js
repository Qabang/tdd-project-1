import express from 'express'
import products from '../storage/products.js'
const router = express.Router()

// Landingpage.
router.get('/products', async (req, res) => {
  res.send(products)
})

export default router
