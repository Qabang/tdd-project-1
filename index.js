import express from 'express'
import products from './routes/products.js'
import mongoose from 'mongoose'

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/products', products)

app.get('/', (req, res) => {
  res.send('hej')
})

mongoose.connect(
  'mongodb+srv://order:order123@cluster0.q5oir.mongodb.net/TDD?retryWrites=true&w=majority',
  () => console.log('connected')
)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', function () {
  console.log('Connected successfully')
})

app.listen(3000, () => {})

export default app
