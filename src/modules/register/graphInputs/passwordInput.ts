import { InputType, Field } from "type-graphql";
import { IsNotEmpty } from "class-validator";


@InputType() 
export class PasswordInput {    
    @Field() 
    @IsNotEmpty()
    password: string;
}