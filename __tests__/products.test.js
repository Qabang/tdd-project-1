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

  it('GET all /api/products', async () => {
    const res = await request(server)
      .get('/api/products')
      .then((response) => response)
    expect(res.statusCode).toBe(200)
  })

  it('GET /api/product 10 items', async () => {
    const expected = 10
    const res = await request(server)
      .get('/api/products')
      .then((response) => response)
    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBe(expected)
  })

  it('GET /api/products/:id 1 item from products', async () => {
    const expected = {
      name: 'Mascara',
      price: 199,
    }
    const res = await request(server)
      .get('/api/products/61966b89fda3abfe427e4d7b')
      .then((response) => response)
    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject(expected)
  })

  it('GET /api/products/:id, should try to get 1 item with non valid id, expect ERROR', async () => {
    let expected = { ERROR: 'ERROR NON VALID ID' }
    const res = await request(server).get('/api/products/619')

    expect(res.statusCode).toBe(422)
    expect(res.body).toMatchObject(expected)
  })
  it('GET /api/products/:id, should try to get 1 item with non existing id, expect ERROR', async () => {
    let expected = { ERROR: 'ERROR NO MATCHING DOCUMENT' }
    const res = await request(server).get(
      '/api/products/61966b89fda3abfe427e4d7c'
    )

    expect(res.statusCode).toBe(404)
    expect(res.body).toMatchObject(expected)
  })

  it('POST /api/products, should create 1 product', async () => {
    const res = await request(server)
      .post('/api/products')
      .send({ name: 'Mascara Blue', price: 229 })
    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject({ created: true })
  })
  it('PUT /api/products/:id, should change product', async () => {
    const res = await request(server)
      .put('/api/products/61975d473917cea33c60c7bd')
      .send({ name: 'Mascara green', price: 299 })
    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject({ created: true })
  })
  it('DELETE /api/products/:id, should delete 1 product', async () => {
    const res = await request(server).delete(
      '/api/products/61975fb82d0435cca073b29d'
    )
    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject({ deleted: true })
  })
})
