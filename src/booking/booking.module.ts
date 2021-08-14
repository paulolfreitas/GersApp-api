import { forwardRef, Module } from '@nestjs/common';
import { TokenModule } from 'src/token/token.module';
import { DatabaseModule } from '../database/database.module';
import { BookingController } from './booking.controller';
import { bookingProviders } from './booking.providers';
import { BookingService } from './booking.service';

@Module({
  imports: [DatabaseModule, TokenModule],//using forwardRef to fix the circular dependency problem
  controllers:[BookingController],
  providers: [
    ...bookingProviders,
    BookingService,
  ],
  //as Im using the userService and importing the module in the auth module, I need to export that.
  exports: [BookingService]
})
export class BookingModule {}