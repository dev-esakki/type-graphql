import { gqSchema } from './schema';
import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";


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
