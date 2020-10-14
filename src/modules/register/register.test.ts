import { gCall } from './../../test-utils/gCall';

import { testConnection } from './../../test-utils/connection';
import { Connection } from 'typeorm';



let connection: Connection;
beforeAll( async() => {
    connection = await testConnection()
})

afterAll(async() => {
    await connection.close()
})

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


describe('register', () => {
    it("create user", async() => {
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
})



