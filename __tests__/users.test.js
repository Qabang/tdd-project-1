import request from 'supertest'
import mongoose from 'mongoose'
import app from '../index.js'
import dotenv from 'dotenv'

dotenv.config()

describe('users', () => {
  let server = null

  beforeEach((done) => {
    server = app.listen(done)
  })

  afterEach((done) => {
    server.close(done)
  })

  beforeAll(async () => {
    await mongoose.connect(process.env.DB_CONNECTION_URL)

    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error: '))
    db.once('open', function () {
      done()
    })
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  it('get Users', async () => {
    const res = await request(server)
      .get('/api/users')
      .then((response) => response)
    expect(res.statusCode).toBe(200)
  })
})
