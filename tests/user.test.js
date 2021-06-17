const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user-model')
const db = require('./fixtures/db')

beforeEach(db.setupDatabase)

test('Should sign up new user', async () => {
    // Post new user
    const response = await request(app)
        .post('/users')
        .send({
            firstName: "New",
            lastName: "User",
            email: "new@test.com",
            password: "testing123"
        })
        .expect(201)

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assert that the response is correct
    expect(response.body).toMatchObject({
        user: {
            email: "new@test.com"
        },
        token: user.tokens[0].token
    })

    // Assert that the password was hashed
    expect(user.password).not.toBe("testing123")
})