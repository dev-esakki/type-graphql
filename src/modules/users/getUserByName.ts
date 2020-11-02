import { User } from './../../entity/User';
import { IGetUser, IGetUserByName, userTypes } from './interface';
import { inject, injectable } from "inversify";
import GetUser from './getUser';

@injectable()
class GetUserByName implements IGetUserByName { 
    checkingThis: string;   
    user: IGetUser
    constructor(
        @inject(userTypes.IGetUser) user: GetUser
    ) {
        this.user = user
    }
    getUser = async(firstName: string): Promise<User> => {
        const user = await User.findOne({ where: { firstName }});
        if(!user) {
            this.checkingThis = "no_user"
            await this.user.testThis()
            throw new Error("no_user_exists")
        }        
        return user
    }

    testThis = async(username: string) => {
        console.log("sssssssssssssssssssssssssssssssssssssssss", this)
        return `${username} ${this.checkingThis}`
    }
}

export default GetUserByName;