describe('POST /users', ()=>{

  it('register a new user', ()=>{

    const user = {
      name: 'Glenda Silva',
      email: 'gtest@test.com',
      password: 'test@123'
    }

    cy.task('deleteUser', user.email)

      cy.api({
        url: '/users',
        method: 'POST',
        body: user,
        failOnStatusCode: false
      }).then(response =>{
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
      })
  })


})