const { expect } = require('chai')
const userController = require('../src/controllers/user')
const db = require('../src/dbClient')

describe('User', () => {
  
  beforeEach(() => {
    // Clean DB before each test
    db.flushdb()
  })

  describe('Create', () => {

    it('create a new user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')
        done()
      })
    })

    it('passing wrong user parameters', (done) => {
      const user = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })

    it('avoid creating an existing user', (done)=> {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, () => {
        userController.create(user, (err, result) => {
          expect(err).to.not.be.equal(null)  // should be an error
          expect(err.message).to.be.equal("User already exists")  // verify error message
          expect(result).to.be.equal(null)
          done()
        })
      })
    })
  })

  // TODO Create test for the get method
  describe('Get', ()=> {
    
    it('get a user by username', (done) => {
      const user = {
        username: 'percyjackson',
        firstname: 'Perseus',
        lastname: 'Jackson'
      }

      // 1. First, create a user to make this unit test independent from the others
      userController.create(user, () => {
        // 2. Then, check if the result of the get method is correct
        userController.get(user.username, (err, result) => {
          expect(err).to.be.equal(null)
          expect(result).to.deep.equal({  // Use deep.equal for comparing objects
            firstname: 'Perseus',
            lastname: 'Jackson'
          })
          done()
        })
      })
    })
  
    it('cannot get a user when it does not exist', (done) => {
      // Chech with any invalid user
      const user = {
        username: 'annchase',
        firstname: 'Annabeth',
        lastname: 'Chase'
      }
      userController.get(user.username, (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(err.message).to.be.equal("User not found")
        expect(result).to.be.equal(null)
        done()
      })
    })
  
  })
})
