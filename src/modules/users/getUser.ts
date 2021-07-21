
import { IGetUser } from './interface';
import { injectable } from "inversify";

@injectable()
class GetUser implements IGetUser {     

    testThis = async() => {
        return true
    }
}

export default GetUser;