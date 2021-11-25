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

  it('GET all /api/users, should return 200 response', async () => {
    const res = await request(server)
      .get('/api/users')
      .then((response) => response)
    expect(res.statusCode).toBe(200)
  })
  it('GET /api/users, should get a minimum of one item', async () => {
    const expected = 0
    const res = await request(server)
      .get('/api/users')
      .then((response) => response)
    expect(res.statusCode).toBe(200)
    expect(res.body.length).not.toBeLessThan(expected)
  })
  it('GET /api/users/:login, should get 1 user', async () => {
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

  it('GET /api/users/:login, should get 1 user item with non existing login. Expect ERROR', async () => {
    let expected = { ERROR: 'ERROR NO MATCHING DOCUMENT' }
    const res = await request(server).get(
      '/api/users/6jeruhc'
    )

    expect(res.statusCode).toBe(404)
    expect(res.body).toMatchObject(expected)
  })
  it('POST /api/users, should create 1 user', async () => {
    const res = await request(server)
      .post('/api/users')
      .send({ name: 'Stefan', login: 'testUser' })
    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject({ created: true })
  })
  it('DELETE /api/users/:login, should delete 1 user', async () => {
    const res = await request(server).delete(
      '/api/users/testUser'
    )
    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject({ deleted: true })
  })
})
