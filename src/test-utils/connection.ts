import { createConnection } from 'typeorm';

export const testConnection = (drop: boolean = false) => {
    return createConnection(
        {
            "type": "mysql",
            "host": "192.168.0.175",
            "port": 3306,
            "username": "root",
            "password": "Trio@123",
            "database": "mydb",
            "synchronize": true,
            "logging": false,
            "dropSchema": drop,
            "entities": [
                __dirname + "/../entity/*.*"
               //"src/entity/**/*.ts"
            ],
            "migrations": [
               "src/migration/**/*.ts"
            ],
            "subscribers": [
               "src/subscriber/**/*.ts"
            ],
            "cli": {
               "entitiesDir": "src/entity",
               "migrationsDir": "src/migration",
               "subscribersDir": "src/subscriber"
            }
         }
    )
}