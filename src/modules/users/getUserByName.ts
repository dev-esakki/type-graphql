import { User } from './../../entity/User';
import { IGetUserByName } from './interface';
import { injectable } from "inversify";

@injectable()
class GetUserByName implements IGetUserByName {    
    getUser = async(firstName: string): Promise<User> => {
        const user = await User.findOne({ where: { firstName }});
        if(!user) {
            throw new Error("no_user_exists")
        }        
        return user
    }
}

export default GetUserByName;