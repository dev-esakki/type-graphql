import { logger } from './../middleware/logger';
import { auth } from './../middleware/auth';
import { RegisterInput } from './graphInputs/registerInput';
import { FieldResolver, Root, Mutation, Arg, UseMiddleware } from 'type-graphql';
import { Resolver } from 'type-graphql';
import { User } from '../../entity/User';
import {  getConnection } from 'typeorm';
import InsertReturn from './schemas/createUser';


@Resolver(User) //need to add for FieldResolver
export class RegisterResolver {
   
    /**
     * field resolver in resolver
     * field resolver to add in return type 
     * defined in entity
     */
    @FieldResolver() 
    async username(@Root() parent: User) {
        return `${parent.firstName} ${parent.lastName}` 
    } 

    /**
     * mutation input in resolver
     */
    @UseMiddleware(auth, logger) //custom middleware
    @Mutation(() => User)
    async adduser(
        @Arg("firstName") firstName: string,
        @Arg("lastName") lastName: string,
        @Arg("age") age: number,
        @Arg("email") email: string,
        @Arg("password") password: string,
    ): Promise<User> {
        const input = {
            firstName, lastName, age, email, password
        }
        const user = await User.create(input).save();
        return user;
    }

    /**
     * insert user
     */
    @Mutation(() => InsertReturn)
    @UseMiddleware(auth, logger) //custom middleware
    async createUser(
        @Arg("data") { firstName, lastName, age, email, password }: RegisterInput,
    ): Promise<{id: number} | any> {
        const input = {
            firstName, lastName, age, email, password
        }
        const masterQuery = getConnection().createQueryRunner("master");
        try {
            const connection = getConnection().getRepository(User);
            const usersList  = await connection.createQueryBuilder()
            .setQueryRunner(masterQuery)
            .insert()
            .into(User)            
            .values([
                input
            ])      
            .execute();
            console.log(usersList.generatedMaps[0])
            return usersList.generatedMaps[0]
        } finally {
            masterQuery.release();
        }
    }    
}
