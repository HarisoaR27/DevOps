// routes/user.js
//handles the "front door" — decides which URL paths lead to which actions.

const express = require('express')
const userController = require('../controllers/user')

const userRouter = express.Router()

userRouter
  .post('/', (req, resp) => {
    userController.create(req.body, (err, res) => {
      let respObj
      if(err) {
        respObj = {
          status: "error",
          msg: err.message
        }
        return resp.status(400).json(respObj)
      }
      respObj = {
        status: "success",
        msg: res
      }
      resp.status(201).json(respObj)
    })
  })
  .get('/:username', (req, resp, next) => { // Express URL params - https://expressjs.com/en/guide/routing.html
    const username = req.params.username

    // TODO Create get method API
    // call get method from controller
    userController.get(username, (err, res) => {
      let respObj
      if (err) {
        respObj = {
          status: "error",
          msg: err.message
        }
        // If the controller says "User not found", 404 is the appropriate status
        return resp.status(404).json(respObj)
      }
      respObj = {
        status: "success",
        msg: res
      }
      resp.status(200).json(respObj)
    })
  })
  
module.exports = userRouter
