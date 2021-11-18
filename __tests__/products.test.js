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
      id: 1,
      name: 'Eyeliner',
      price: 199
    }
    const res = await request(app).get('/products/1')
    console.log(res.body)
    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject(expected)
  })
})

/*describe('/students endpoints', () => {

  })

  it('GET /students/3 should get 1 student', async () => {
    const mockDb = createMockDb(mockData)
    const app = await createApp(mockDb)
    const res = await request(app).get('/students/3')
    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject({ _id: 3, name: 'Per', age: 57 })
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
