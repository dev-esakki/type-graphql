import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class InsertReturn {
    @Field()
    id: number;
}