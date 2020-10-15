import { injectable } from "inversify";

@injectable()
class GetUserByName implements IGetUserByName {    
    getUser = async() => {
        
    }
}

export default GetUserByName;