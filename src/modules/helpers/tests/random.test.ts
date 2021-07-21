
import randomnumber, { users } from '../../helpers/random'


describe('random.ts', () => {
    it("random number ", () => {

        const mock = jest.fn((a,b) =>randomnumber(a,b));
        let result = mock(1,10);
        expect(result).toBeGreaterThan(0);
        expect(mock).toHaveBeenCalled();
        expect(mock).toHaveBeenCalledTimes(1);
        expect(mock).toHaveBeenCalledWith(1,10);
      });

      it("users ", () => {
        const helpers = { users }
        helpers.users = jest.fn().mockResolvedValue([
            {
                "age": expect.any(Number),
                "email": expect.any(String),
                "firstName": expect.any(String),
                "id": expect.any(String),
                "lastName": expect.any(String),
                "username": expect.any(String),
            }
        ]);
      });
})
