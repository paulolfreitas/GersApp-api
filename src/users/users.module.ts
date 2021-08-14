import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)],//using forwardRef to fix the circular dependency problem
  controllers:[UsersController],
  providers: [
    ...usersProviders,
    UsersService,
  ],
  //as Im using the userService and importing the module in the auth module, I need to export that.
  exports: [UsersService]
})
export class UsersModule {}