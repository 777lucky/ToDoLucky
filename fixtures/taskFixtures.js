const faker = require('faker');

function create() {
    return{
        name: faker.name.findName(),
        description: faker.lorem.sentence(),
        due_date: faker.date.future()
    }
}

module.exports={create}