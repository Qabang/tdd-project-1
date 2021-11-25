import server from './index.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(process.env.DB_CONNECTION_URL, () => console.log('Connected to mongoose'))

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', function () {
  console.log('Connected successfully to DB')
})

server.listen(3000, () => {
  console.log('Server is running on port 3000')
})

export default server
