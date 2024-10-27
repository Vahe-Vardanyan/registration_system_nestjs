import {
  Body,
  Post,
  Get,
  Controller,
} from '@nestjs/common';
import {
  RolesDto,
} from './dto/role.dto';
import { RolesService } from './roles.service';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import {
  ResponseError,
  ResponseSuccess,
} from '../common/dto/response.dto';
import { APIResponse } from '../common/enums/api.enum';

@ApiSecurity('issuer-api-key')
@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}


  @Get('findRoles')
  async findRoles() {
    try {
      const result = await this.rolesService.findRoles();
      return new ResponseSuccess(APIResponse.SUCCESS, result);
    } catch (error) {
      return new ResponseError(APIResponse.ERROR, error.message, error.status);
    }
  }


  @Post('createRole')
  async createRole(@Body() data: RolesDto) {
    try {
      let result = await this.rolesService.createRole(data);
      return new ResponseSuccess(APIResponse.SUCCESS, result);
    } catch (error) {
      return new ResponseError(APIResponse.ERROR, error.message, error.status);
    }
  }

}
