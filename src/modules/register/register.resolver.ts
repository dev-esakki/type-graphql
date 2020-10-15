import { logger } from './../middleware/logger';
import { auth } from './../middleware/auth';
import { RegisterInput } from './registerInput';
import { Query, FieldResolver, Root, Mutation, Arg, Authorized, UseMiddleware } from 'type-graphql';
import { Resolver } from 'type-graphql';
import { User } from '../../entity/User';


@Resolver(User) //need to add for FieldResolver
export class BookResolver {
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
    @Mutation(() => User)
    @UseMiddleware(auth, logger) //custom middleware
    async createUser(
        @Arg("data") { firstName, lastName, age, email, password }: RegisterInput,
    ): Promise<User> {
        const input = {
            firstName, lastName, age, email, password
        }
        const user = await User.create(input).save();
        return user;
    }    
}