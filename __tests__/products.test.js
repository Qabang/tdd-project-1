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

  it('get products', async () => {
    const res = await request(server)
      .get('/products')
      .then((response) => response)
    expect(res.statusCode).toBe(200)
  })

  it('GET /product 10 items', async () => {
    const expected = 10
    const res = await request(server)
      .get('/products')
      .then((response) => response)
    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBe(expected)
  })

  it('GET /product 1 item', async () => {
    const expected = {
      name: 'Clown makeup',
      price: 332,
    }
    const res = await request(server).get('/products/61966b89fda3abfe427e4d7b')
    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject(expected)
  })

  it('GET /product 1 item with non valid/non existing id', async () => {
    let expected = { ERROR: 'ERROR NO MATCHING DOCUMENT' }
    let expectedStatusCode = 404
    const res = await request(server).get('/products/619')

    if (res.body.ERROR === 'ERROR NON VALID ID') {
      expected.ERROR = 'ERROR NON VALID ID'
      expectedStatusCode = 422
    }

    expect(res.statusCode).toBe(expectedStatusCode)
    expect(res.body).toMatchObject(expected)
  })

  it('POST /product should create 1 product', async () => {
    // const res = await request(app)
    //   .post('/products')
    //   .send({ name: 'Mascara Blue', price: 229 })
    // expect(res.statusCode).toBe(200)
    // expect(res.body).toMatchObject({ created: true })
  })
})

/*describe('/students endpoints', () => {

  })


  it('POST /students should create 1 student', async () => {
    const mockDb = createMockDb(mockData)
    const app = await createApp(mockDb)
    const res = await request(app)
      .post('/students')
      .send({ name: 'Penny', age: 32 })
    expect(res.statusCode).toBe(201)
    expect(res.body).toMatchObject({ created: true })
  })

  it('DELETE /students should delete 1 student', async () => {
    const mockDb = createMockDb(mockData)
    const app = await createApp(mockDb)
    const res = await request(app).delete('/students/3')
    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject({ deleted: true })
  })
})*/
