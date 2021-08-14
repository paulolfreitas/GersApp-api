import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    AuthModule, // this is already importing the usermodule, so I dont need to put it into here
    BookingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
