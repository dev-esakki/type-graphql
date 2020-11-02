import { Container } from "inversify";
import { userTypes } from "../users/interface";
import GetUserByName from "../users/getUserByName";
import { IGetUserByName, IGetUser } from './../users/interface';
import GetUser from "../users/getUser";

var container = new Container();
container.bind<IGetUserByName>(userTypes.IGetUserByName).to(GetUserByName);
container.bind<IGetUser>(userTypes.IGetUser).to(GetUser);

export default container;