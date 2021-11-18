import express from 'express'
const router = express.Router()

// Landingpage.
router.get('/products', async (req, res) => {
  res.send('hello world')
})

export default router
