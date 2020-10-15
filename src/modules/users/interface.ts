import { User } from './../../entity/User';
/**
 * get user interface
 */
export interface IGetUserByName {
    getUser(string: string): Promise<User>
}

/**
 * user types
 */
export const userTypes = {
    IGetUserByName: Symbol.for("IGetUserByName"),
}