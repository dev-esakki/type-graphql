import { gqSchema } from './../schema';


import { graphql, GraphQLSchema } from 'graphql'
import { Maybe } from 'type-graphql';

interface Options {
    source: string //graphql schema query or mutation
    variableValues?: Maybe<{ // graphql variables it may be optional also
        [key: string]: any
    }>
    userid?: any
}

let schema: GraphQLSchema;

export const gCall = async({ source, variableValues, userid }: Options) => {
    if(!schema) {
        schema = await gqSchema();
    }
    return graphql({
        schema,
        source,
        variableValues,
        contextValue: {
            req: {
                headers: {
                    userid
                }
            },
        }
    })
}