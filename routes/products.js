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
      return res.status(501).send({ ERROR: 'ERROR NON VALID ID' })
    }

    try {
      const product = await Products.findOne({
        _id: id,
      })

      if (product === null || product === undefined) {
        // We did not find a matching document throw error.
        return res.status(501).send({ ERROR: 'ERROR NO MATCHING DOCUMENT' })
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

  .delete('/:id', async (req, res) => {
    try {
      const deleteProduct = await Products.deleteOne({
        _id: id,
      })
      res.send(deleteProduct)
      res.status(201).send({ deleted: true })
    } catch (err) {
      console.error('Error DELETE /product', err)
      res.status(501).send(SERVER_ERROR)
    }
  })
export default appProduct
// import express from 'express'
// import Products from '../models/productsModel.js'
// const appProducts = express.Router()

// // Landingpage.
// appProducts
//   .get('/', async (req, res) => {
//     res.send(Products)
//   })
//   .get('/:id', async (req, res) => {
//     const prodId = parseInt(req.params.id)

//     try {
//       const Product = Products.find(({ id }) => id === prodId)
//       console.log(Product)
//       res.send(Product)
//     } catch (err) {
//       console.error('Error GET /products/id', err)
//       res.status(501).send(SERVER_ERROR)
//     }
//   })
//   .post('/', async (req, res) => {

//     try {
//       res.status(201).send({ created: true })
//     } catch (error) {
//       res.status(500).send(error)
//     }
//   })

// export default appProducts
