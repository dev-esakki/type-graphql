import { Mixins } from '../../sharedInputs/mixins';
import { PasswordInput } from './passwordInput';
import { InputType, Field } from "type-graphql";
import { IsEmail } from "class-validator";
import { IsUserAlreadyExist } from "../constrains/validationConstrain";


@InputType() 
export class RegisterInput extends Mixins(PasswordInput) { //mixins are used to add extra fields present shared query
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
     * password input in pasword input present in extended password input field
     */
}