import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    login: {
      type: String,
      required: true
    }
  },
  { versionKey: false }
)

const Users = mongoose.model('Users', UserSchema)

export default Users
