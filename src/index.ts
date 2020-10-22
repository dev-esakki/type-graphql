import { gqSchema } from './schema';
import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";


async function main() { 
    await createConnection().then(async() => {
        console.log("Database Connected")
        const schema = await gqSchema()
        const server = new ApolloServer({ 
            schema,
            context: ({ req }: any) => ({ req })
        })
        await server.listen(4000)
        console.log("Server has started!")
    }).catch(err => {
        console.log("err", err)
    })    

    /* const conn = await createConnection()
    const slaveQueryRunner = conn.createQueryRunner("master");
    try {
        const connection = conn.getRepository(User);
        const usersList  = await connection.createQueryBuilder("user")                        
        .setQueryRunner(slaveQueryRunner)
        .getMany();
        console.log(usersList)

    } finally {
        slaveQueryRunner.release();
    } */

    /* const conn = await createConnection()
    const masterQuery = conn.createQueryRunner("master");
    const input = {
        firstName: "trioangle", lastName: "test", age: 25, email: "trio@mail.com", password: "roiort"
    }
    try {
        const connection = conn.getRepository(User);
        const usersList  = await connection.createQueryBuilder()
        .setQueryRunner(masterQuery)
        .insert()
        .into(User)
        .values([
            input
        ])
        .execute();
        console.log(usersList)
    } finally {
        masterQuery.release();
        conn.close()
    } */

    /* const conn = await createConnection()
    const slaveQueryRunner = conn.createQueryRunner("slave");

    try {
        const connection = conn.getRepository(User);
        const usersList  = await connection.createQueryBuilder("user")                        
        .setQueryRunner(slaveQueryRunner)
        .where("user.firstName = :firstName", {firstName: "trioangle"})
        .getOne();
        console.log(usersList)

    } finally {
        slaveQueryRunner.release();
    } */
}

main();
