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
  .get('/:login', async (req, res) => {
    const login = req.params.login

    try {
      const user = await Users.findOne({
        login: login,
      })

      if (user === null || user === undefined) {
        // We did not find a matching document throw error.
        return res.status(404).send({ ERROR: 'ERROR NO MATCHING DOCUMENT' })
      }

      res.send(user)
    } catch (err) {
      console.error('Error GET /users/login', err)
      res.status(501).send(err)
    }
  })
  .post('/', async (req, res) => {
    const user = new Users(req.body)

    try {
      await user.save()
      res.send({ created: true })
    } catch (error) {
      res.status(500).send(error)
    }
  })
  .delete('/:login', async (req, res) => {
    const login = req.params.login
    try {
      const deleteUser = await Users.deleteOne({
        login: login,
      })

      res.status(200).send({ deleted: true })
    } catch (err) {
      console.error('Error DELETE /product', err)
      res.status(501).send('SERVER ERROR')
    }
  })


export default appUsers