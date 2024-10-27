import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesDto } from './dto/role.dto';
import { RolesEntity } from './roles.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesEntity)
    private readonly rolesRepository: Repository<RolesEntity>,
  ) {}

  async findRoles() {
    const roles = await this.rolesRepository.find();
    return roles;
  }

  async createRole(data: RolesDto): Promise<RolesDto> {
    const model = this.rolesRepository.create(data);
    return await this.rolesRepository.save(model);
  }
}
