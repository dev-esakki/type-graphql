import { gqSchema } from './schema';
import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
//import { BookResolver } from './modules/register/register.resolver';

//import { Resolver, Query } from "type-graphql";
//import {User} from "./entity/User";

/* createConnection().then(async connection => {
    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");
}).catch(error => console.log(error)); */


async function main() { 
    await createConnection()
    const schema = await gqSchema()
    const server = new ApolloServer({ 
        schema,
        context: ({ req }: any) => ({ req })
     })
    await server.listen(4000)
    console.log("Server has started!")
}

main();
