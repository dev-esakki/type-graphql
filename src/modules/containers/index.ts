import { Container } from "inversify";
import { userTypes } from "../users/interface";
import GetUserByName from "../users/getUserByName";
import { IGetUserByName } from './../users/interface';

var container = new Container();
container.bind<IGetUserByName>(userTypes.IGetUserByName).to(GetUserByName);

export default container;