import express from 'express'
import Users from '../models/usersModel.js'
const appUsers = express.Router()

appUsers.use(express.urlencoded({ extended: true }))
appUsers.use(express.json())

appUsers

  .get('/', async (req, res) => {
    const users = await Users.find({})
    try {
      res.send(users)
    } catch (error) {
      res.status(500).send(error)
    }
  })




export default appUsers