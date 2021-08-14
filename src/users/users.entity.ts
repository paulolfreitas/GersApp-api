import { Booking } from 'src/booking/booking.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({length: 100} )
  email: string;

  @Column({length: 100} )
  phoneNumber: string;

  @Column({length: 255 })
  password: string;

  // one user can hava many bookings
  @OneToMany(() => Booking, booking => booking.user)
  booking: Booking[];

}