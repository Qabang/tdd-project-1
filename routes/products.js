import express from 'express'
import Products from '../models/productsModel.js'
const appProduct = express.Router()

appProduct.use(express.urlencoded({ extended: true }))
appProduct.use(express.json())

appProduct
  .get('/', async (req, res) => {
    const products = await Products.find({})
    try {
      res.send(products)
    } catch (error) {
      res.status(500).send(error)
    }
  })

  .get('/:id', async (req, res) => {
    const id = req.params.id
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      // No, it's not a valid ObjectId, do not proceed with `findById` call.
      return res.status(422).send({ ERROR: 'ERROR NON VALID ID' })
    }

    try {
      const product = await Products.findOne({
        _id: id,
      })

      if (product === null || product === undefined) {
        // We did not find a matching document throw error.
        return res.status(404).send({ ERROR: 'ERROR NO MATCHING DOCUMENT' })
      }

      res.send(product)
    } catch (err) {
      console.error('Error GET /products/id', err)
      res.status(501).send(err)
    }
  })

  .post('/', async (req, res) => {
    const product = new Products(req.body)

    try {
      await product.save()
      res.send({ created: true })
    } catch (error) {
      res.status(500).send(error)
    }
  })
  .put('/:id', async (req, res) => {
    const item = await Products.findOne({
      _id: req.params.id,
    })
    const product = await Products.updateOne({ _id: req.params.id }, {
      $set: {
        name: req.body.name,
        price: req.body.price
      }
    })

    try {
      res.send({ created: true })
    } catch (error) {
      res.status(500).send(error)
    }
  })

  .delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
      const deleteProduct = await Products.deleteOne({
        _id: id,
      })

      res.status(200).send({ deleted: true })
    } catch (err) {
      console.error('Error DELETE /product', err)
      res.status(501).send('SERVER ERROR')
    }
  })
export default appProduct

