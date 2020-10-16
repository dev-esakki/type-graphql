import { gCall } from '../../../test-utils/gCall';
import faker from 'faker'
import { testConnection } from '../../../test-utils/connection';
import { Connection } from 'typeorm';


//default jest configured in tsConfig.json
let connection: Connection;
beforeAll( async() => {
    connection = await testConnection()
})

afterAll(async() => {
    await connection.close()
})

afterEach(() => jest.resetAllMocks());


describe('register.ts', () => {

    it('createUser user mutation', async() => {
        expect.assertions(1) //how many test to run
        const inputUser = `
        mutation createUser($data: RegisterInput!) {
            createUser(
                data: $data
            ) {
                id
                firstName
                lastName
                email
                username
                age
            }
          }`
          const user = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            age: 20,
            password: faker.internet.password(),
            amount: 100
          };
          const result = await gCall({
            source: inputUser,
            variableValues: {
                data: user
            },
            userid: "testsdsd"
        })
        expect(result).toMatchObject({
            data: {
                createUser: {
                id: expect.any(String),
                firstName: expect.any(String),
                lastName: expect.any(String),
                email: expect.any(String),
                username: expect.any(String),
                age: expect.any(Number),
              }
            }
        });
        //expect(result).toMatchSnapshot() //to get the result snapshot and updated --verbose in package json

    });
    

    it('adduser user mutation', async() => {
        expect.assertions(1) //how many test to run
        const inputUser = `
        mutation adduser(
            $firstName: String!
            $lastName: String!
            $email: String!
            $age: Float!
            $password: String!
        ) {
            adduser(
                firstName: $firstName
                lastName: $lastName
                email: $email
                age: $age
                password: $password
            ) {
                id
                firstName
                lastName
                email
                username
                age
            }
          }`
          const user = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            age: 20,
            password: faker.internet.password(),
            amount: 100
          };
          const result = await gCall({
            source: inputUser,
            variableValues: user,
            userid: "testsdsd"
        })
        expect(result).toMatchObject({
            data: {
                adduser: {
                id: expect.any(String),
                firstName: expect.any(String),
                lastName: expect.any(String),
                email: expect.any(String),
                username: expect.any(String),
                age: expect.any(Number),
              }
            }
        });
        //expect(result).toMatchSnapshot() //to get the result snapshot and updated --verbose in package json

    });    

})



