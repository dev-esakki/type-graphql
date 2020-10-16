import { PhotoInput } from './photoInput';
import { User } from './../../entity/User';
import { Photo } from './../../entity/userPhoto';
import { Resolver, Arg, Query, Mutation, Authorized } from "type-graphql";
import container from '../containers';
import GetUserByName from './getUserByName';

@Resolver()
export class UserResolver {

     /**
     * query 
     */
    @Authorized() //need auth checker defined in server/index.ts
    @Query(() => User)
    async hello(
        @Arg("firstName") firstName: string, 
        //@Ctx() ctx: any
    ): Promise<User | undefined > {
        //console.log(ctx.req.headers.userid)
        const user = await User.findOne({ where: { firstName: firstName }});
        if(!user) {
            throw new Error("no_user_exists")
        }
        
        return user
    }

    
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