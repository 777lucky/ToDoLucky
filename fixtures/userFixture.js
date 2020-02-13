const faker = require('faker')

function create() {
    return{
        name: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: faker.internet.password()
    }
}

module.exports={create};