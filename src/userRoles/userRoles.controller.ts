import { Body, Post, Get, UseGuards, Controller } from '@nestjs/common';
import { UserRolesDto } from './dto/userRoles.dto';
import { UserRolesService } from './userRoles.service';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ResponseError, ResponseSuccess } from '../common/dto/response.dto';
import { APIResponse } from '../common/enums/api.enum';

@ApiSecurity('issuer-api-key')
@ApiTags('UserRoles')
@Controller('userRoles')
export class UserRolesController {
  constructor(private userRolesService: UserRolesService) {}

  @Get('findUserRoles')
  async findUserRoles() {
    try {
      const result = await this.userRolesService.findUserRoles();
      return new ResponseSuccess(APIResponse.SUCCESS, result);
    } catch (error) {
      return new ResponseError(APIResponse.ERROR, error.message, error.status);
    }
  }

  @Post('createUserRole')
  async createUserRole(@Body() data: UserRolesDto) {
    try {
      let result = await this.userRolesService.createUserRole(data);
      return new ResponseSuccess(APIResponse.SUCCESS, result);
    } catch (error) {
      return new ResponseError(APIResponse.ERROR, error.message, error.status);
    }
  }
}
