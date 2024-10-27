import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../user/dto/user.dto';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwt(user: UserDto): Promise<string> {
    let user_data = {
      user_id: user.user_id,
      user_name: user.user_name,
      email: user.email,
    };
    return await this.jwtService.signAsync({ user_data });
  }
  async generateJwtwithPhone(user: UserDto): Promise<string> {
    let user_data = {
      user_id: user.user_id,
      user_name: user.user_name,
    };
    return await this.jwtService.signAsync({ user_data });
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async comparePasswords(
    password: string,
    storedPasswordHash: string,
  ): Promise<any> {
    return await bcrypt.compare(password, storedPasswordHash);
  }
}
