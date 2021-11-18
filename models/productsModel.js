import mongoose from 'mongoose'

const ProductsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  { versionKey: false }
)

const Products = mongoose.model('Products', ProductsSchema)

export default Products