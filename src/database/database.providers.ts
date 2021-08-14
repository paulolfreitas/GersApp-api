import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'gers_database', //database I created in workbench
      entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
      ],
      synchronize: true, // everytime nest will try to synchronize, this is not the best option, because if we delete a column and restart the api, it will delete all the data that was there before.
    }),
  },
];