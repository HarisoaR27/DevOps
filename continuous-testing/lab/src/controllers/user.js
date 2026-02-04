// controllers/user.js
// handles the brain work of talking to the database

const  db= require('../dbClient')

module.exports = {
  create: (user, callback) => {
    // Check parameters
    if(!user.username)
      return callback(new Error("Wrong user parameters"), null)
    // Create User schema
    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
    }
    // Save to DB
    // Check if user already exists
    db.exists(user.username, (err, exists) => {
      if (err) return callback(err, null) // there is an error
      
      if (exists === 1) {
        // User exists
        return callback(new Error("User already exists"), null)
      }
      
      // User does not exist, we are creating a new one and saving to DB
      db.hmset(user.username, userObj, (err, res) => {
        if (err) return callback(err, null)
        callback(null, res) // Return callback
      })
    })
  },
  get: (username, callback) => {
    db.hgetall(username, (err, result) => {
      if (err) return callback(err, null)

      if (!result) {
        return callback(new Error("User not found"), null)
      }

      callback(null, result)
    })
  }
}

