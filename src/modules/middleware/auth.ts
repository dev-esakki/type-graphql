import { MiddlewareFn } from "type-graphql";

export const auth: MiddlewareFn = async ({ context }: any, next) => {
    if(!context.req.headers.userid) {
        throw new Error("need_authorzation")
    }

    return next();
  };
  