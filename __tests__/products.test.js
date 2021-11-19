import request from 'supertest'
import app from '../index.js'

describe('products', () => {
  it('get products', async () => {
    const res = await request(app).get('/products')
    expect(res.statusCode).toBe(200)
  })
  it('GET /product 10 items', async () => {
    const expected = 10
    const res = await request(app).get('/products')
    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBe(expected)
  })
  it('GET /product 1 items', async () => {
    const expected = {
      name: "Clown makeup",
      price: 332

    }
    const res = await request(app).get('/products/61966b89fda3abfe427e4d7b')

    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject(expected)
  })
  it('POST /product should create 1 product', async () => {
    const res = await request(app)
      .post('/products')
      .send({ name: 'Mascara Blue', price: 229 })
    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject({ created: true })
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
