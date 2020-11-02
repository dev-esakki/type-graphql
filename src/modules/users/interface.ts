import { Stream } from "stream";
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



/**
 * file upload
 */
export interface Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}