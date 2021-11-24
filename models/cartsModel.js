import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema(
  {
    userLogin: {
      type: String,
      required: true
    },
    productId: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    }
  },
  { versionKey: false }
)

const Cart = mongoose.model('Cart', CartSchema)

export default Cart
