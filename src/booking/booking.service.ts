import { Injectable, Inject } from '@nestjs/common';
import { ResponseDto } from 'src/dto/response.dto';
import { Repository, getConnection } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Booking } from './booking.entity';
import { BookingRegisterDto } from './dto/booking.register.dto';
import { Users } from 'src/users/users.entity';

//method to list all the users
@Injectable()
export class BookingService {
  constructor(
    @Inject('BOOKING_REPOSITORY')
    private bookingRepository: Repository<Booking>,
  ) {}
  
  async viewAll(): Promise<Booking[]>{
    return this.bookingRepository.find();
  }

  async register(data: BookingRegisterDto, user: Users): Promise<ResponseDto>{
    let booking = new Booking()
    booking.serviceType = data.serviceType
    booking.vehicle_type = data.vehicle_type
    booking.enginee_type = data.enginee_type
    booking.license = data.license
    booking.user = user
    booking.date = data.date 
    booking.time = data.time
    booking.cost = data.cost
    booking.status = data.status
    booking.addCost = data.addCost
    booking.mechanic = data.mechanic
// creating a query to check the date and time that the user input, if for this date and time the number of bookis is 3 the system wont let the user book and will show the message the is full
    const number = await getConnection()
    .createQueryBuilder()
    .select('*')
    .from(Booking, "booking")
    .where("booking.date = :date", { date: data.date })// date that the user input
    .andWhere("booking.time = :time", { time: data.time }) // time that the user input
    .getCount();
    console.log(number)
if(number < 3){
    return this.bookingRepository.save(booking).then(() => {
       return <ResponseDto>{
        status: true,
        message: "Appointment booked"
       }
    }).catch(() => {
      return <ResponseDto>{
        status: false,
        message: "Error in the booking"
      }
      })}else{
        return <ResponseDto>{
          status: false,
          message: "Sorry this date and time is full!"
      }
  }}
 // view will receive the id of the user and return all the bookings with this id
  async view(id): Promise<Booking[]> {
    return this.bookingRepository.find({where: {user: {id}}});
  }
//return the payments with the id from the user.
  async payment(id): Promise<Booking[]> {
    return this.bookingRepository.find({where: {user: {id}, status: "Completed"}});
  }
//updating the data in booking, each item will be upadated with a query
  async updateBooking(data) {
    if (data.cost != "null" || data.cost != "") {
        await getConnection()
    .createQueryBuilder()
    .update(Booking)
    .set({cost: data.cost})
    .where("booking.id = :id", { id: data.id })
    .execute();
    }
    if (data.status != "null" || data.status != "") {
        await getConnection()
    .createQueryBuilder()
    .update(Booking)
    .set({ status: data.status})
    .where("booking.id = :id", { id: data.id })
    .execute();
    }
    if (data.addCost != "null" || data.addCost != "") {
        await getConnection()
    .createQueryBuilder()
    .update(Booking)
    .set({addCost: data.addCost})
    .where("booking.id = :id", { id: data.id })
    .execute();
    }
      if (data.mechanic != "null" || data.mechanic != "") {
        await getConnection()
    .createQueryBuilder()
    .update(Booking)
    .set({mechanic: data.mechanic})
    .where("booking.id = :id", { id: data.id })
    .execute();
    }
  
  }

}