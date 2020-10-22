import { PhotoInput } from './photoInput';
import { User } from './../../entity/User';
import { Photo } from './../../entity/userPhoto';
import { Resolver, Arg, Query, Mutation, Authorized } from "type-graphql";
import container from '../containers';
import GetUserByName from './getUserByName';
import { getConnection } from 'typeorm';

@Resolver()
export class UserResolver {

     /**
     * query 
     */
    @Authorized() //need auth checker defined in server/index.ts
    @Query(() => User)
    async hello(
        @Arg("firstName") firstName: string, 
    ): Promise<User | undefined > {
        const slaveQueryRunner = getConnection().createQueryRunner("slave");
        try {
            const connection = getConnection().getRepository(User);
            const usersList  = await connection.createQueryBuilder("user")                        
            .setQueryRunner(slaveQueryRunner)
            .where("user.firstName = :firstName", {firstName })
            .getOne();
            console.log(usersList)
            return usersList
        } finally {
            slaveQueryRunner.release();
        }        
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