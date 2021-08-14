import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ResponseDto } from 'src/dto/response.dto';
import { UserCreateDto } from './dto/user.create.dto';
import { Users } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private authService: AuthService) {}

@UseGuards(JwtAuthGuard)
@Get('findAll')
async findAll(): Promise<Users[]>{
    return this.usersService.findAll()
}
    
@Post('register')
async register(@Body() data: UserCreateDto): Promise<ResponseDto>{
    return this.usersService.register(data)   
}
//post to do the login 
@UseGuards(AuthGuard('local'))
@Post('login')
async login(@Request() req) {
  return this.authService.login(req.user)
}
// login using the toke, the user does not need to enter the email and password if he ha a token valid.
@Post('loginToken')
async loginToken(@Request() req, @Body() data) {
  return this.authService.loginToken(data.token)
}
}