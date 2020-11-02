import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { ObjectType, Field, ID, Root } from "type-graphql";
import { Photo } from "./userPhoto";

@ObjectType()
@Entity({ name: "users"}) //database name { database: "Master" }
export class User extends BaseEntity {

    @Field(() => ID) //graphql return type
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column() 
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    @Column()
    age: number;

    /* @Field() //not in database only return type using field resolver
    username: string; //used in resolver */

    @Field()
    //@Column("text", { unique: true })  //unique fields
    @Column()
    email: string;

    @Column()  //dont have Field column(dosen't return )
    password: string;

    @Field()
    username( @Root() parent: User): string {
        return `${parent.firstName} ${parent.lastName}` 
    }

    /* @Column({ type: "varchar", length: 15, default: "react"})
    location: string; */

    //@OneToOne(() => Photo)
    @OneToOne(() => Photo) 
    @JoinColumn()
    photo: Photo;

    @CreateDateColumn({ name: 'created_at', nullable: false })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', nullable: true })
    updatedAt: Date;

    
}
