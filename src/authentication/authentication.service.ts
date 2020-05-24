import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import RegisterDto from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import PostgresErrorCodes from '../database/PostgresErrorCodes.enum';
import LogInDto from './dto/logIn.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService
  ) {}

  public async register(registrationData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.usersService.create({
        ...registrationData,
        password: hashedPassword
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCodes.UniqueViolation) {
        throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async logIn(logInData: LogInDto) {
    try {
      const user = await this.usersService.getByEmail(logInData.email);
      const isPasswordMatching = await bcrypt.compare(
        logInData.password,
        user.password
      );
      if (!isPasswordMatching) {
        return new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
      }
      user.password = undefined;
      return user;
    }
    catch (error) {
      return new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }
}
