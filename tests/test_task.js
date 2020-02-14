const chai = require('chai')
const chaiHttp = require('chai-http')
const {
    expect
} = chai;

chai.use(require('chai-http'));
const server = require('../index.js')

let User = require('../models/user.js')
let Task = require('../models/task.js')

// const userFixture = require('../fixtures/userFixture.js')
// const userSample = userFixture.create
// const taskFixture = require('../fixtures/taskFixtures.js')
// const taskSampe = taskFixture.create

describe('Task API Unit Testing', () => {
    before(function() {
        //User.deleteMany({})
        User.deleteMany({}).then(i => done());
        // User.register({
        //     name: 'test',
        //     email: 'unittesting@mail.com',
        //     password: '123123',
        //     password_confirmation: '123123'
        // })
    })

    after(function() {
        User.deleteMany({});
        //Task.deleteMany({});
        //User.deleteMany({}).then(i => done());
    })

    context('POST /api/v1/users/register', () => {
        //positive
        it('Should create new user', done => {
            let user = {
                name: 'testing',
                email: 'unittesting@mail.com',
                password: '123456',
                password_confirmation: '123456'
            }

            chai.request(server)
            .post('/api/v1/users/register')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify(user))
            .end((err, res) => {
                console.log(res.body)
                expect(res.status).to.eq(201)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('status')
                expect(res.body).to.have.property('data')
                done()
            })
        })
        //negative
        it('Should have failed to create new user', (done) => {
            let user = {
                name: 'testing',
                email: 'unittesting@mail.com',
                password: '123456',
                password_confirmation: '123456'
            }

            chai.request(server)
            .post('/api/v1/users/register')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify(user))
            .end((err, res) => {
                console.log(res.body)
                expect(res.status).to.eq(422)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('status')
                //expect(res.body).to.have.property('data')
                done()
            })
        })
    })


    
    context('POST /api/v1/users/login', () => {
        it('Should logged in', done => {
            let user = {
                email: 'unittesting@mail.com',
                password: '123456'
            }

            chai.request(server)
            .post('/api/v1/users/login')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify(user))
            .end((err, res) => {
                console.log(err);
                console.log(res.body);
                expect(res.status).to.eq(200);
                done()
            })
        })
        //negative
        it('Should have not logged in', done => {
            let user = {
                email: 'unittesting@mail.com',
                password: '1234567'
            }

            chai.request(server)
            .post('/api/v1/users/login')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify(user))
            .end((err, res) => {
                console.log(err);
                console.log(res.body);
                expect(res.status).to.eq(400);
                done()
            })
        })
    })

    context('POST /api/v1/tasks/create', () => {
        it('Should create a new task for an authorized user', function() {
            let user = {
                email: 'unittesting@mail.com',
                password: '123456'
            }
            let task = {
                name: 'test',
                description: 'unit testing by choi and mocha',
                due_date: '2020-02-21'
            }

            chai.request(server)
            .post('/api/v1/users/login')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify(user))
            .end((err, res) => {
                chai.request(server)
                .post('/api/v1/tasks/create')
                .set('Content-Type', 'application/json')
                .set('Authorization', res.body.data.token)
                .send(JSON.stringify(task))
                .end(function(err, res){
                    expect(res.status).to.equal(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('success');
                    expect(res.body).to.have.property('data');
                    let {success, data} = res.body;
                    expect(success).to.eq(true);
                    expect(data).to.be.an('object');
                })
            })
        })
    })
    
})