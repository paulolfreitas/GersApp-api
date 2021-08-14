import { Injectable, Inject, HttpException, HttpStatus, forwardRef } from '@nestjs/common';
import { ResponseDto } from 'src/dto/response.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Token } from './token.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/auth/auth.service';
import { Users } from 'src/users/users.entity';

//method to list all the users
@Injectable()
export class TokenService {
  constructor(
    @Inject('TOKEN_REPOSITORY')
    private tokenRepository: Repository<Token>,
    private usersService: UsersService,
    @Inject(forwardRef(() => AuthService)) // using it because of the circular dependency
    private authService: AuthService
  ) {}

  //creating a method to save the token in my db
  async saveToken(hash: string, username: string){
    let objToken = await this.tokenRepository.findOne({username: username})
    if (objToken){
      this.tokenRepository.update(objToken.id, {
        hash:hash
      })
    }else{
    this.tokenRepository.insert({
      hash: hash,
      username: username
    })}
  } 

  // this code refreshes the token tha the user has, since the token will be expiring 60s.
  async refreshToken(oldToken: string){
    let objToken = await this.tokenRepository.findOne({hash: oldToken})
    if(objToken){
      let user = await this.usersService.findOne(objToken.username)
      return this.authService.login(user)
    }else{// if the token is invalid 
      return new HttpException({
        errorMessage: 'Token invalid'
      }, HttpStatus.UNAUTHORIZED) // i am returning unathorized if the token trying to refresh is invalid
    }
  }

  async getUserByToken(token: string): Promise<Users>{
    token = token.replace("Bearer ","").trim() // need that to remove bearer and then can use token
    let objToken: Token = await this.tokenRepository.findOne({hash: token})
    if (objToken){
      let user = await this.usersService.findOne(objToken.username)
      return user
    }else{// if the token is invalid 
      return null 
    }
  }
}