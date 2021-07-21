import { PhotoInput } from './photoInput';
import { User } from './../../entity/User';
import { Photo } from './../../entity/userPhoto';
import { Resolver, Arg, Query, Mutation, Authorized } from "type-graphql";
import container from '../containers';
import GetUserByName from './getUserByName';
import { getConnection } from 'typeorm';
import InsertReturn from '../register/schemas/createUser'
import { GraphQLUpload } from 'graphql-upload';
import { createWriteStream } from "fs";
import { Upload } from './interface';
import { join } from 'path';

@Resolver()
export class UserResolver {

     /**
     * query 
     */
    @Authorized() //need auth checker defined in server/index.ts
    @Query(() => User)
    async hello(
        @Arg("firstName") firstName: string, 
    ): Promise<User | undefined > {
        const slaveQueryRunner = getConnection().createQueryRunner("master");
        try {
            const connection = getConnection().getRepository(User);
            const usersList  = await connection.createQueryBuilder("user")                        
            .setQueryRunner(slaveQueryRunner)
            .where("user.firstName = :firstName", {firstName })
            .getOne();    
            if(!usersList) {
                throw new Error("No_User_Found")
            }   

            return usersList
        } finally {
            slaveQueryRunner.release();
        }        
    }

    
  /**
     * get all user using inversify
     */
    @Query(() => User)
    async getUserWithname(
        @Arg("firstName") firstName: string, 
    ): Promise<User | undefined > {
        const fields = container.resolve(GetUserByName)
        const getFields = await fields.getUser(firstName) 
        return getFields;
    }

    /**
     * update user photo
     */    
    @Mutation(() => InsertReturn)
    async updatePhoto(
        @Arg("data") { userid, image }: PhotoInput,
    ): Promise<Photo | any> {
        const input = {
            userid, image
        }
        const masterQuery = getConnection().createQueryRunner("master");
        try {
            const connection = getConnection().getRepository(Photo);
            const photoList  = await connection.createQueryBuilder()
            .setQueryRunner(masterQuery)
            .insert()
            .into(Photo)            
            .values([
                input
            ])      
            .execute();
            return photoList.generatedMaps[0]
        } finally {
            masterQuery.release();
        }
    }  

     /**
     * query 
     */
    @Authorized() //need auth checker defined in server/index.ts
    @Query(() => User)
    async getUserById(
        @Arg("id") id: string, 
    ): Promise<User | undefined > {
        const slaveQueryRunner = getConnection().createQueryRunner("master");
        try {
            
            const connection = getConnection().getRepository(User);
            const usersList  = await connection.createQueryBuilder("user")                        
            .setQueryRunner(slaveQueryRunner)
            .where("user.id = :id", {id })
            .leftJoinAndSelect("user.photo", "Photo")
            .getOne();    
            if(!usersList) {
                throw new Error("No_User_Found")
            }   
            console.log(usersList)
            return usersList
        } finally {
            slaveQueryRunner.release();
        }        
    }

    @Mutation(() => Boolean)
    async addProfilePicture(@Arg("picture", () => GraphQLUpload)
    {
      createReadStream,
    }: Upload): Promise<boolean> {
    const filename = "user.png";
    const path = join(__dirname + `/../../../uploads/${filename}`)
      return new Promise(async (resolve, reject) =>
        createReadStream()
          .pipe(createWriteStream(path))
          .on("finish", () => resolve(true))
          .on("error", () => reject(false))
      );

    }
}