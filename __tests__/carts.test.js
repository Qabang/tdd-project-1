import request from 'supertest'
import mongoose from 'mongoose'
import app from '../index.js'
import dotenv from 'dotenv'

dotenv.config()

describe('products', () => {
  jest.setTimeout(10000)
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
  it('get carts', async () => {
    const res = await request(server)
      .get('/api/carts')
      .then((response) => response)
    expect(res.statusCode).toBe(200)
  })
  it('POST 1 item, should create 1 item in carts', async () => {
    const res = await request(server)
      .post('/api/carts')
      .send({ productId: '619cf9e3d7d2df81b5c85225', amount: 5 })
    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject({ created: true })
  })
})