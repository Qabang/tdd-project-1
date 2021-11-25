import request from 'supertest'
import mongoose from 'mongoose'
import app from '../index.js'
import dotenv from 'dotenv'

dotenv.config()

describe('carts', () => {
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

  it('GET /api/carts/, should show all items in carts', async () => {
    const res = await request(server)
      .get('/api/carts')
      .then((response) => response)

    expect(res.statusCode).toBe(200)
  })

  it('GET /api/carts/Doe 2 items from the cart with the userLogin "Doe"', async () => {
    const expected = 2
    const res = await request(server)
      .get('/api/carts/Doe')
      .then((response) => response)

    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBe(expected)
  })

  it('POST /api/carts/:userLogin 1 item, should create 1 item in carts of user with userlogin "lundstrom"', async () => {
    const expected = { created: true }

    const res = await request(server).post('/api/carts/lundstrom').send({
      userLogin: 'lundstrom',
      productId: '619cf9e3d7d2df81b5c85225',
      amount: 2,
    })

    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject(expected)
  })
  it('PUT /api/carts/:userLogin/:itemId, should change 1 item', async () => {
    const res = await request(server)
      .put('/api/carts/lundstrom/619e0cc8863bf6db59b3baa2')
      .send({ productId: '61975e7b5e0a4a28e7b3229e', amount: 15 })
    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject({ created: true })
  })

  it('DELETE /api/carts/:userLogin/:itemId 1 item, should delete 1 item from the user "lundstrom"', async () => {
    const cartId = '619e191f5729aa977f436398'
    const res = await request(server).delete(`/api/carts/lundstrom/${cartId}`)
    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject({ deleted: true })
  })
})
