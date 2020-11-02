import { Stream } from "stream";
import { User } from './../../entity/User';
/**
 * get user interface
 */
export interface IGetUserByName {
    getUser(string: string): Promise<User>
    testThis(username: string): Promise<any>
}

export interface IGetUser {
    testThis(): Promise<any>
}

/**
 * user types
 */
export const userTypes = {
    IGetUserByName: Symbol.for("IGetUserByName"),
    IGetUser: Symbol.for("IGetUser"),
}



/**
 * file upload
 */
export interface Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}