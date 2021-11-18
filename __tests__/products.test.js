import request from 'supertest'
import app from '../index.js'

describe('products', () => {
  it('get products', async () => {
    const res = await request(app).get('/products')
    expect(res.statusCode).toBe(200)
  })
})
