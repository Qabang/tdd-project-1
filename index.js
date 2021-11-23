import express from 'express'
import products from './routes/products.js'

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/products', products)

app.get('/', (req, res) => {
  res.send('hej')
})

export default app
