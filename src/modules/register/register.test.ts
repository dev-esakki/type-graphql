import { gCall } from './../../test-utils/gCall';
import faker from 'faker'
import { testConnection } from './../../test-utils/connection';
import { Connection } from 'typeorm';
import randomnumber from './random'


let connection: Connection;
beforeAll( async() => {
    connection = await testConnection()
})

afterAll(async() => {
    await connection.close()
})


describe('register', () => {
    it("get user by name", async() => {
        expect.assertions(4) //how many test to run
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
        //without userid
        const userAccess = await gCall({
            source: getUser,
        })
        expect(userAccess.errors?.values).toThrow()

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
                username: expect.any(String),
              }
            }
        });
        expect(result).toBeDefined();
        expect(result.data!.hello.firstName).toBe("esakki");
    })

    it('createUser user mutation', async() => {
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

    it('adduser user mutation', async() => {
        expect.assertions(2) //how many test to run
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
        expect(result).toMatchSnapshot() //to get the result snapshot and updated --verbose in package json

    });

    it("random number ", () => {
        const helpers = { randomnumber }
        helpers.randomnumber = jest.fn();
        const result = randomnumber(1, 1);
        expect(result).toBeGreaterThan(0)
        expect(result).toBeTruthy()
      });

})



