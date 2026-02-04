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

    // it('avoid creating an existing user', (done)=> {
    //   // TODO create this test
    //   // Warning: the user already exists
    //   done()
    // })
  })

  describe('Get', ()=> {
    
    it('get a user by username', (done) => {
      const user = {
        username: 'har',
        firstname: 'hari',
        lastname: 'soa'
      }

      // 1. créer un user
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)

        // 2. le récupérer
        userController.get('alice', (err, result) => {
          expect(err).to.be.equal(null)
          expect(result.firstname).to.be.equal('Alice')
          expect(result.lastname).to.be.equal('Doe')
          done()
        })
      })
    })

    it('cannot get a user when it does not exist', (done) => {
      userController.get('unknown', (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })

  })
})
