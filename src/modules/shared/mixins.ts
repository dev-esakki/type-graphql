import { ClassType, InputType, Field } from "type-graphql";

export const Mixins = <T extends ClassType>(BaseClass: T) => {
   @InputType()
   class OkInput extends BaseClass {
     @Field()
     ok: boolean
   }
   return OkInput;
}