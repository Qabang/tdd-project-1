import server from './index.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(process.env.DB_CONNECTION_URL, () => console.log('connected'))

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', function () {
  console.log('Connected successfully')
})

server.listen(3000, () => {
  console.log('Server is running')
})

export default server
