import { MiddlewareFn } from 'type-graphql';


export const logger: MiddlewareFn = async(_, next) => {
    console.log("logger")
    return next();
}