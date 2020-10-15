import { User } from './../../entity/User';
/**
 * get user interface
 */
interface IGetUserByName {
    getUser(): Promise<User>
}