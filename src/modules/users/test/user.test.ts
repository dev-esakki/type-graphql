import { testConnection } from './../../../test-utils/connection';

import { gCall } from './../../../test-utils/gCall';
import { Connection } from 'typeorm';
import { createReadStream } from 'fs';
import { resolve } from 'path';

let connection: Connection;
beforeAll( async() => {
    connection = await testConnection()
})

afterAll(async() => {
    await connection.close()
})



describe('user.resolver.ts', () => {
    it("get user by name", async() => {
        //expect.assertions(4) //how many test to run
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
        try {
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

        } catch (e) {
            expect(userAccess.errors?.values).toThrow()
        }        
    })
    
    it('upload user mutation', async() => {
        expect.assertions(1) //how many test to run
        const inputUser = `mutation updatePhoto($data: PhotoInput!){
          updatePhoto(
            data: $data
          ) {
            id
          }
        }`
          const userPhoto = {
            userid: 1,
            image: "test.png"
          };
          const result = await gCall({
            source: inputUser,
            variableValues: {
                data: userPhoto
            },
            userid: "testsdsd"
        })
        expect(result).toMatchObject({
            data: {
              updatePhoto: {
                id: expect.any(Number),
              }
            }
        });
    
      });


      it("file upload testing", async() => {
        const filename = `user.png`
        const file = createReadStream(resolve(`./testImages/${filename}`))
        const inputUser = `mutation  addProfilePicture($picture: Upload!)  {
          addProfilePicture(picture: $picture) 
        }`;
        //let rand = Math.random().toString(36).substring(7);
        const result = await gCall({
          source: inputUser,
          variableValues: {
            picture: new Promise(resolve => resolve({
                createReadStream: () => file,
                stream: file,
            })),
          },
          userid: "testsdsd"
        })
        console.log(result)

      })
})
