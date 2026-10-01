describe('POST /users', ()=>{
  it('register a new user', ()=>{
    const user = {
      name: 'Glenda Silva',
      email: 'gtest@test.com',
      password: 'test@123'
    }

    cy.task('deleteUser', user.email)

    cy.postUser(user).then(response => {
      expect(response.status).to.eq(200)
    })     
  })

   it('duplicate email', ()=>{
    const user = {
      name: 'Gabriel Silva',
      email: 'gstest@test.com',
      password: 'test@123'
    }

    cy.task('deleteUser', user.email)
    cy.postUser(user)

    cy.postUser(user).then(response => {

      const {message} = response.body

      expect(response.status).to.eq(409)
      expect(message).to.eq('Duplicated email!')
    })     
  })

  context('required fields', ()=> {
    let user;
    beforeEach(()=>{
      user = {
        name: 'Gabriel Cueva',
        email:'cueva@test.com',
        password: 'test@123'
      }
    })

    it('name is required', ()=> {

      delete user.name

      cy.postUser(user)
        .then(response=> {

          const {message} = response.body
          expect(message).to.eq('ValidationError: \"name\" is required')
          expect(response.status).to.eq(400)
        })

    })

    it('email is required', ()=> {

      delete user.email

      cy.postUser(user)
        .then(response=> {

          const {message} = response.body
          expect(message).to.eq('ValidationError: \"email\" is required')
          expect(response.status).to.eq(400)
        })

    })

    it('password is required', ()=> {

      delete user.password

      cy.postUser(user)
        .then(response=> {

          const {message} = response.body
          expect(message).to.eq('ValidationError: \"password\" is required')
          expect(response.status).to.eq(400)
        })

    })
  })
})

