describe('POST /sessions', ()=>{

    it('user session', ()=>{
        const user = {
             name: 'Glenda Rodrigues',
             email:'ssilva@test.com',
             password: 'silva123'
        }

        cy.postSession(user).then(response => {
            expect(response.status).to.eq(200)
        })

        // cy.api({
        //     url: '/sessions',
        //     method: 'POST',
        //     body: user
        // }).then(response => {return response})
    })

    it('invalid password', ()=> {
        const user = {
            email:'ssilva@test.com',
            password: '123456'
        }

        cy.postSession(user).then(response => {
            expect(response.status).to.eq(401)
        })

        cy.api({
            url: '/sessions',
            method: 'POST',
            body: user,
            failOnStatusCode: false
        }).then(response => {return response})
    })

     it('email not found', ()=> {
        const user = {
            email:'ssilvaww@test.com',
            password: '123456'
        }

        cy.postSession(user).then(response => {
            expect(response.status).to.eq(401)
        })

        cy.api({
            url: '/sessions',
            method: 'POST',
            body: user,
            failOnStatusCode: false
        }).then(response => {return response})
    })

})

Cypress.Commands.add('postSession', (user)=>{
 cy.api({
        url: '/sessions',
        method: 'POST',
        body: { email: user.email, password: user.password },
        failOnStatusCode: false
      }).then(response => {return response})
})