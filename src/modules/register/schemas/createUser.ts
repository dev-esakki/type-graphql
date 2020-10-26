import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class TypeCreateUser {
    @Field()
    id: number;
}