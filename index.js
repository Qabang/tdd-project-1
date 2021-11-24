import express from 'express'
import products from './routes/products.js'
import users from './routes/users.js'
import carts from './routes/carts.js'

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api/products', products)
app.use('/api/users', users)
app.use('/api/carts', carts)

app.get('/', (req, res) => {
  res.send('hej')
})

export default app
