Cypress.Commands.add('purgeQueueMessages', () => {
    cy.env(['amqpHost', 'ampqToken']).then(env => {
        return cy.api({
            url: env.amqpHost + '/tasks/contents',
            method: 'DELETE',
            headers: {
                authorization: env.amqpToken
            },
            failOnStatusCode: false
        })
    })
})

Cypress.Commands.add('getMessagesQueue', () => {
    cy.env(['amqpHost', 'amqpToken']).then(env => {
        return cy.api({
            url: env.amqpHost + '/tasks/get',
            method: 'POST',
            body: {
                count: 1,
                ack_mode: 'reject_requeue_true',
                encoding: 'auto',
                truncate: 50000
            },
            headers: {
                authorization: env.amqpToken
            },
            failOnStatusCode: false
        })
    })
})
