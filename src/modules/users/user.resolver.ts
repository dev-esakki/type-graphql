import { User } from './../../entity/User';
import { Resolver, Arg, Query } from "type-graphql";

@Resolver()
export class UserResolver {
  /**
     * get all user using inversify
     */
    @Query(() => User)
    async getUserWithname(
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
}