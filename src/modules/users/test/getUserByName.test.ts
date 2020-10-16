
import { testConnection } from '../../../test-utils/connection';
import { IGetUserByName } from '../interface';

import container from "../../containers";
import GetUserByName from '../getUserByName';
import { Connection } from 'typeorm';

let fields: IGetUserByName;


//default jest configured in tsConfig.json
let connection: Connection;
beforeAll( async() => {
    connection = await testConnection()
})

afterAll(async() => {
    await connection.close()
})

beforeEach(async() => {
  fields = container.resolve(GetUserByName)
  
});

describe('test', () => {

  it('should ', async() => {
    try {
      const result = await fields.getUser("dfgdfg") 
      expect(result).toHaveProperty('firstName')
      expect(result).toMatchObject({
        firstName: expect.any(String), 
        lastName: expect.any(String), 
        age: expect.any(Number), 
        email: expect.any(String), 
        password: expect.any(String), 
      })
    } catch (e){
      expect(e.message).toBe("no_user_exists");
    }
  }); 

});