import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Get,
  HttpException,
  HttpStatus,
  UseGuards,
  Request,
  Delete,
  Req,
} from '@nestjs/common';
import { CodeDto, CreateUserDto } from './dto/create_user.dto';
import { LoginUserDto } from './dto/login_user.dto';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import {
  ApiResponseSuccess,
  ResponseError,
  ResponseSuccess,
} from '../common/dto/response.dto';
import { APIResponse } from '../common/enums/api.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateResult } from 'typeorm';
import { Status } from '../auth/role.enum';
import { WithOutApiKey } from 'src/apikey.decorator';

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiSecurity('issuer-api-key')
  @Post('register')
  async create(@Body() createdUserDto: CreateUserDto) {
    try {
      const userData = await this.userService.register(createdUserDto);

      if (userData?.status != Status.REGISTERED) {
        return new ResponseError(
          APIResponse.ERROR,
          userData?.message,
          userData?.status,
        );
      } else {
        if (userData) {
          return new ApiResponseSuccess(APIResponse.SUCCESS, userData);
        } else {
          throw new HttpException(
            'You can not registered',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
    } catch (error) {
      return new ResponseError(APIResponse.ERROR, error.message, error.status);
    }
  }

  @ApiSecurity('issuer-api-key')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('findThisUser')
  async findThisUser(@Request() req: any) {
    try {
      let user = await this.userService.findUserById(req.user.user_id);
      return new ResponseSuccess(APIResponse.SUCCESS, user);
    } catch (error) {
      return new ResponseError(APIResponse.ERROR, error.message, error.status);
    }
  }

  @ApiSecurity('issuer-api-key')
  @Get('findUserByEmail/:email')
  async findByEmail(@Param('email') email: string) {
    try {
      let user = await this.userService.findByEmail(email);
      return new ResponseSuccess(APIResponse.SUCCESS, user);
    } catch (error) {
      return new ResponseError(APIResponse.ERROR, error.message, error.status);
    }
  }

  

  @ApiSecurity('issuer-api-key')
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      let accessToken = await this.userService.login(loginUserDto);
      let userToken = {
        access_token: accessToken?.generateJwt,
        token_type: 'JWT',
        expires_in: process.env.EXPIRES_IN,
      };
      let userId = accessToken.userId;
      let role = accessToken.role;
      let status = accessToken.status;
      let is_verified_instructor = accessToken.is_verified_instructor;
      let subscriptionType = accessToken.subscriptionType;
      let verification_code = accessToken.verification_code;
      let email = accessToken.email;
      let user_name = accessToken.userName;

      return new ResponseSuccess(APIResponse.SUCCESS, {
        userToken,
        userId,
        role,
        status,
        subscriptionType,
        is_verified_instructor,
        verification_code,
        user_name,
        email,
      });
    } catch (error) {
      return new ResponseError(APIResponse.ERROR, error.message, error.status);
    }
  }

  @WithOutApiKey()
  @Get('/makeVerified/:verify_code/:user_id')
  async makeVerified(
    @Param('verify_code') verify_code: string,
    @Param('user_id') userId: number,
  ) {
    try {
      await this.userService.makeVerified(verify_code, userId);

      return new ResponseSuccess(APIResponse.SUCCESS);
    } catch (error) {
      return new ResponseError(APIResponse.ERROR, error.message, error.status);
    }
  }

  @ApiSecurity('issuer-api-key')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('updateUserInfo')
  async updateUserInfo(@Request() req: any, @Body() data: any) {
    try {
      let isDone: UpdateResult;
      isDone = await this.userService.update(req.user.user_id, data);

      if (isDone.affected > 0) {
        return new ResponseSuccess(APIResponse.SUCCESS);
      } else {
        return new ResponseError(APIResponse.ERROR);
      }
    } catch (error) {
      return new ResponseError(APIResponse.ERROR, error.message, error.status);
    }
  }

  @ApiSecurity('issuer-api-key')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('deactivate')
  async deactivate(@Request() req: any) {
    try {
      await this.userService.deleteUser(req.user.user_id);
      return new ResponseSuccess(APIResponse.SUCCESS);
    } catch (error) {
      return new ResponseError(APIResponse.ERROR, error.message, error.status);
    }
  }

  @ApiSecurity('issuer-api-key')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('makeUserDeleted')
  async makeUserDeleted(@Request() req: any) {
    try {
      await this.userService.makeUserDeleted(req.user.user_id);
      return new ResponseSuccess(APIResponse.SUCCESS);
    } catch (error) {
      return new ResponseError(APIResponse.ERROR, error.message, error.status);
    }
  }
}
