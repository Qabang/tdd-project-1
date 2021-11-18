import express from 'express'
import products from './routes/products.js'

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(products)

app.listen(3000, () => {
  console.log(`server is running on port 3000`)
})

export default app
