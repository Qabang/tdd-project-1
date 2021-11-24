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
  it('GET /api/users 10 items', async () => {
    const expected = 10
    const res = await request(server)
      .get('/api/users')
      .then((response) => response)
    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBe(expected)
  })
  it('GET /users 1 item', async () => {
    const expected = {
      name: "sara",
      login: "lundstrom"
    }
    const res = await request(server)
      .get('/api/users/lundstrom')
      .then((response) => response)
    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject(expected)
  })

  it('GET 1 user item with non existing login, expect ERROR', async () => {
    let expected = { ERROR: 'ERROR NO MATCHING DOCUMENT' }
    const res = await request(server).get(
      '/api/users/6jeruhc'
    )

    expect(res.statusCode).toBe(404)
    expect(res.body).toMatchObject(expected)
  })
  it('POST 1 user, should create 1 user', async () => {
    const res = await request(server)
      .post('/api/users')
      .send({ name: 'Zeljko', login: 'hej435' })
    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject({ created: true })
  })
  it('DELETE 1 user, should delete 1 user', async () => {
    const res = await request(server).delete(
      '/api/users/hej123'
    )
    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject({ deleted: true })
  })
})
