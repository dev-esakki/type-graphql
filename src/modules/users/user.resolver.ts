import { User } from './../../entity/User';
import { Resolver, Arg, Query } from "type-graphql";
import container from '../containers';
import GetUserByName from './getUserByName';

@Resolver()
export class UserResolver {
  /**
     * get all user using inversify
     */
    @Query(() => User)
    async getUserWithname(
        @Arg("firstName") firstName: string, 
    ): Promise<User | undefined > {
        const fields = container.resolve(GetUserByName)
        const getFields = await fields.getUser(firstName) 
        return getFields;
    }
}