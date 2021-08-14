import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';
import { Users } from 'src/users/users.entity';
@Injectable()
export class AuthService {
    //injecting the usersSevice to use it while checking the username and password
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private tokenService: TokenService
        ) {}


    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        // as im using bcrypt to generate the hash code i am using it to check the hash password.
        if (user && bcrypt.compareSync(password, user.password)) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }

      async login(user: any) {
          //creating the jwt with the information we need
        const payload = { username: user.email, sub: user.id };
        const token = this.jwtService.sign(payload)
        const id = user.id
        this.tokenService.saveToken(token, user.email) //saving the token
        return {
          access_token: token,
          user: user.email,
          phone: user.phoneNumber,
          name: user.name,
        };
      }

      async loginToken(token: string) {
          //cheking if the token we get from the front end is valid for the user
        let user: Users = await this.tokenService.getUserByToken(token)
        if (user){
            return this.login(user)
        }else{// if the token is invalid 
            return new HttpException({
              errorMessage: 'Token invalid'
            }, HttpStatus.UNAUTHORIZED) // i am returning unathorized if the token trying to refresh is invalid
          }
    }

    
}
