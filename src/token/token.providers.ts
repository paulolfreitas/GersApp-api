import { Connection, Repository } from 'typeorm';
import { Token } from './token.entity';

// connection with database
export const tokenProviders = [
  {
    provide: 'TOKEN_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Token),
    inject: ['DATABASE_CONNECTION'],
  },
];