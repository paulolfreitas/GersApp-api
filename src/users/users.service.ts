import { Injectable, Inject } from '@nestjs/common';
import { ResponseDto } from 'src/dto/response.dto';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user.create.dto';
import { Users } from './users.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<Users>,
  ) {}
//method to list all the users
  async findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }
// to register an new user
  async register(data: UserCreateDto): Promise<ResponseDto>{
    let user = new Users()
    user.email = data.email
    user.name = data.name
    user.phoneNumber = data.phoneNumber
    user.password = bcrypt.hashSync(data.password, 8) // using this to hash the password

    return this.usersRepository.save(user)
    .then((result) => {
        return <ResponseDto>{
            status: true,
            message: "User Registered"
        }
    })
    .catch((error) =>{
        return <ResponseDto>{
            status: false,
            message: "Error"
        }
    }
    ) 
  }

  //looking for the user in our database
  async findOne(email: string): Promise<Users | undefined> {
    return this.usersRepository.findOne({email:email});
  }
}