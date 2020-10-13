import { Mixins } from './../shared/mixins';
import { PasswordInput } from './passwordInput';
import { InputType, Field } from "type-graphql";
import { IsEmail } from "class-validator";
import { IsUserAlreadyExist } from "./validationConstrain";


@InputType() 
export class RegisterInput extends Mixins(PasswordInput) {
    @Field() 
    //@Length(1, 20)
    firstName: string;

    @Field() 
    lastName: string;

    @Field() 
    age: number;

    @Field() 
    @IsEmail()
    @IsUserAlreadyExist({ message: "email_exist"}) //error added form constrain
    email: string;

    /**
     * password input in pasword input field controlled by mixins
     */
}