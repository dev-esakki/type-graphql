import { gCall } from './../../test-utils/gCall';
import faker from 'faker'
import { testConnection } from './../../test-utils/connection';
import { Connection } from 'typeorm';



let connection: Connection;
beforeAll( async() => {
    connection = await testConnection()
})

afterAll(async() => {
    await connection.close()
})


describe('register', () => {
    it("get user by name", async() => {
        expect.assertions(3) //how many test to run
        const getUser = `
        query {
            hello(firstName: "esakki") {
            id
            firstName
            lastName
            age
            username
            email
            }
        }
        `
        const result = await gCall({
            source: getUser,
            userid: "testsdsd"
        })
        expect(result).toMatchObject({
            data: {
                hello: {
                firstName: expect.any(String),
                lastName: expect.any(String),
                email: expect.any(String),
                age: expect.any(Number),
              }
            }
        });
        expect(result).toBeDefined();
        expect(result.data!.hello.firstName).toBe("esakki");
    })

    it('adduser user mutation', async() => {
        expect.assertions(2) //how many test to run
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
        expect(result).toMatchSnapshot() //to get the result snapshot and updated --verbose in package json

    });

})



