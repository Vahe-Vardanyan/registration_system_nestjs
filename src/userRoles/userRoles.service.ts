import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRolesDto } from './dto/userRoles.dto';
import { UserRolesEntity } from './userRoles.entity';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectRepository(UserRolesEntity)
    private readonly userRolesRepository: Repository<UserRolesEntity>,
  ) {}

  async findUserRoles() {
    const roles = await this.userRolesRepository.find();
    return roles;
  }

  async createUserRole(data: UserRolesDto): Promise<UserRolesDto> {
 
    const model = this.userRolesRepository.create(data);
    const result = await this.userRolesRepository.save(model);
    return result;
  }
}
