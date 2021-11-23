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

  it('GET /product 1 item', async () => {
    const expected = {
      name: 'Clown makeup',
      price: 332,
    }
    const res = await request(app).get('/products/61966b89fda3abfe427e4d7b')
    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject(expected)
  })

  it('GET 1 product item with non valid id, expect ERROR', async () => {
    let expected = { ERROR: 'ERROR NON VALID ID' }
    const res = await request(app).get('/products/619')

    expect(res.statusCode).toBe(422)
    expect(res.body).toMatchObject(expected)
  })
  it('GET 1 product item with non existing id, expect ERROR', async () => {
    let expected = { ERROR: 'ERROR NO MATCHING DOCUMENT' }
    const res = await request(app).get('/products/61966b89fda3abfe427e4d7c')

    expect(res.statusCode).toBe(404)
    expect(res.body).toMatchObject(expected)
  })

  it('POST 1 product, should create 1 product', async () => {
    const res = await request(app)
      .post('/products')
      .send({ name: 'Mascara Blue', price: 229 })
    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject({ created: true })
  })
  it('PUT 1 product, should change product', async () => {
    const res = await request(app)
      .put('/products/61966b89fda3abfe427e4d7b')
      .send({ name: 'Mascara Green', price: 159 })
    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject({ created: true })
  })
  it('DELETE 1 product, should delete 1 product', async () => {

    const res = await request(app).delete('/products/61975fb82d0435cca073b29d')
    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject({ deleted: true })
  })
})



