const { defineConfig } = require("cypress");

const { connect } = require ('./cypress/support/mongo.js')

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      // implement node event listeners here
      const db = await connect()

      on('task', {
          async removeUser(email){
              const users = db.collection('users')
              await users.deleteMany({email: email})
              return null
          },
          async removeTask(taskName, emailUser){
              const tasks = db.collection('tasks')
              const users = db.collection('users')
              const user = users.findOne({email: emailUser})

              await tasks.deleteMany({name: taskName, user: user._id})
              return null

          },
           async removeTasksLike(key){
              const tasks = db.collection('tasks')
              await tasks.deleteMany({name: {$regex: key}})
              return null
          }
      })
    },
    baseUrl: 'http://localhost:3333',
    env:{
      amqpHost: 'https://leopard.lmq.cloudamqp.com/api/queues/bunefmzi',
      amqpQueue: 'tasks',
      amqpToken: 'Basic YnVuZWZtemk6MFVqajhXdG1NTkd0N2wzdUJlaXNGc0hqbUZram9JZmw='
    } 
  },
});
