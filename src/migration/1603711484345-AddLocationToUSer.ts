import {MigrationInterface, QueryRunner} from "typeorm";

export class AddLocationToUSer1603711484345 implements MigrationInterface {
    name = 'AddLocationToUSer1603711484345'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `location` varchar(15) NOT NULL DEFAULT 'react'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `location`");
    }

}
