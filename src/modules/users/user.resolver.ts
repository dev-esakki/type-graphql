import { PhotoInput } from './photoInput';
import { User } from './../../entity/User';
import { Photo } from './../../entity/userPhoto';
import { Resolver, Arg, Query, Mutation } from "type-graphql";
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

    /**
     * update user photo
     */    
    @Mutation(() => Photo)
    async updatePhoto(
        @Arg("data") { userid, image }: PhotoInput,
    ): Promise<Photo> {
        const input = {
            userid, image
        }
        const user = await Photo.create(input).save();
        return user;
    }  
}