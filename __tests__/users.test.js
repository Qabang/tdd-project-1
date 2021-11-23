import request from 'supertest'
import app from '../index.js'

describe('users', () => {
  it('get Users', async () => {
    const res = await request(app).get('/api/users')
    expect(res.statusCode).toBe(200)
  })
})