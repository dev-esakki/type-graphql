import { buildSchema } from 'type-graphql';

export const gqSchema = () => {
    return buildSchema({
        resolvers: [__dirname + "/modules/**/*.resolver.ts"],
        authChecker: ({ context: { req } }: any): any => {
            return !!req.headers.userid
        }
    })
}