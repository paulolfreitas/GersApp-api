import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ResponseDto } from 'src/dto/response.dto';
import { TokenService } from 'src/token/token.service';
import { Users } from 'src/users/users.entity';
import { Booking } from './booking.entity';
import { BookingService } from './booking.service';
import { BookingRegisterDto } from './dto/booking.register.dto';



@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService,
    private readonly tokenService: TokenService) {}
  
  @UseGuards(JwtAuthGuard)
  @Post('register')
    async register(@Body() data: BookingRegisterDto, @Req() req): Promise<ResponseDto>{
      let token = req.headers.authorization
      let user: Users = await this.tokenService.getUserByToken(token) // i need to call tokenService in the constructor
    if(user){
      return this.bookingService.register(data, user)   
    }else{
      throw new HttpException({
        errorMessage: 'Token invalid'
      }, HttpStatus.UNAUTHORIZED)

    }
      
}
  @UseGuards(JwtAuthGuard)
  @Get('viewAll')
    async viewAll(): Promise<Booking[]>{
        return this.bookingService.viewAll()
    }

    // view booking will get the user id and send to the service to find all the booking with this id.
  @UseGuards(JwtAuthGuard)
  @Get('viewBooking')
    async viewBooking(@Req() req) {
      let token = req.headers.authorization
      let user: Users = await this.tokenService.getUserByToken(token)
      if(user){
        console.log(user.id)
        return this.bookingService.view(user.id)
      }else{
        throw new HttpException({
          errorMessage: 'Token invalid'
        }, HttpStatus.UNAUTHORIZED)
      }
    }
    @UseGuards(JwtAuthGuard)
    @Post('updateBooking')
      async updateBooking(@Body() data: BookingRegisterDto, @Req() req) {
        let token = req.headers.authorization
        let user: Users = await this.tokenService.getUserByToken(token)
        if(user){
          return this.bookingService.updateBooking(data)
        }else{
          throw new HttpException({
            errorMessage: 'Token invalid'
          }, HttpStatus.UNAUTHORIZED)
        }
      }
      @UseGuards(JwtAuthGuard)
      @Get('payment')
        async payment(@Req() req) {
          let token = req.headers.authorization
          let user: Users = await this.tokenService.getUserByToken(token)
          if(user){
            console.log(user.id)
            return this.bookingService.payment(user.id)
          }else{
            throw new HttpException({
              errorMessage: 'Token invalid'
            }, HttpStatus.UNAUTHORIZED)
          }
        }
}