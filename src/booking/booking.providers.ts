import { Connection, Repository } from 'typeorm';
import { Booking } from './booking.entity';


export const bookingProviders = [
  {
    provide: 'BOOKING_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Booking),
    inject: ['DATABASE_CONNECTION'],
  },
];