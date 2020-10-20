import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";


@ObjectType()
@Entity() //{ database: "Master1" }
export class Photo extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    userid: number;


    @Field()
    @Column()
    image: string;

}