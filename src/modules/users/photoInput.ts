
import { InputType, Field } from "type-graphql";


@InputType() 
export class PhotoInput {
    @Field()     
    userid: number;

    @Field() 
    image: string;

}