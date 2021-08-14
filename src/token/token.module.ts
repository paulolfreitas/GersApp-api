import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { DatabaseModule } from '../database/database.module';
import { TokenController } from './token.controller';
import { tokenProviders } from './token.providers';
import { TokenService } from './token.service';


@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule), UsersModule],//using forwardRef to fix the circular dependency problem
  controllers:[TokenController],
  providers: [
    ...tokenProviders,
    TokenService,
  ],
  //as Im using the tokenService and importing the module in the auth module, I need to export that.
  exports: [TokenService]
})
export class TokenModule {}