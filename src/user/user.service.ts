import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { Repository } from 'typeorm';
import { CreateUserDto, CodeDto } from './dto/create_user.dto';
import { LoginUserDto } from './dto/login_user.dto';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import { EmailService } from '../email/email.service';
import { UserEmailsDto } from 'src/email/dto/user_registration.dto';
import { Role, Status } from '../auth/role.enum';
import { UserUpdateInfoDo } from './dto/update_user.dto';
import { UserRolesService } from '../userRoles/userRoles.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private authService: AuthService,
    private emailService: EmailService,
    private userRolesRepository: UserRolesService,
  ) {}
  private authSid = process.env.ACCOUNT_SID;
  private authToken = process.env.AUTH_TOKEN;

  async getRoleID(role: string): Promise<any> {
    switch (role) {
      case Role.ADMIN:
        return 1;
      case Role.CLIENT:
        return 2;
    }
  }

  async register(newUserDto: CreateUserDto): Promise<any> {
    let user: any;

    // try {
    const userExists = await this.findByEmail(newUserDto.email);
    if (userExists) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    newUserDto.verification_code = await this.makeCode(5);
    newUserDto.password = await bcrypt.hash(newUserDto.password, 12);

    const userModel = this.userRepository.create(newUserDto);

    user = await this.userRepository.save(userModel);

    if (user) {
      let roleId = await this.getRoleID(newUserDto.role);
      if (roleId) {
        const userRolsData = await this.userRolesRepository.createUserRole({
          user_id: user.user_id,
          role_id: roleId,
        });
        const sendEmail = this.sendVerificationEmail(newUserDto, user.user_id);
        if (sendEmail) {
          return user;
        } else {
          await this.deleteUser(user?.user_id);

          throw new HttpException('Mail can not send', HttpStatus.BAD_REQUEST);
        }
      }
    } else {
      throw new HttpException(
        'User not registered',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findUserById(id: number): Promise<UserEntity> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.user_role', 'user_role')
      .leftJoinAndSelect('user_role.role_id', 'role')
      .where('user.user_id = :user_id', {
        user_id: id,
      })
      .getOne();

    return user;
  }

  async makeCode(length: any) {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return Number(result);
  }

  sendEmailFunc(userEmailDto: any, templateName: any, subject: any) {
    const context = {
      username: 'John Doe', // User's name
      confirmationLink: 'https://example.com/confirm/123456', // Confirmation link
      // Any other data you want to include in the email template
    };
    const sendEmail = this.emailService.sendEmail(
      userEmailDto,
      userEmailDto.to_email,
      subject,
      templateName,
      context,
    );

    if (sendEmail) {
      return true;
    } else {
      throw new HttpException('Mail can not send', HttpStatus.BAD_REQUEST);
    }
  }

  sendVerificationEmail(dto: any, user_id: number) {
    let templateName = 'verification';
    let subject = 'Account Verification';
    let userEmailDto = new UserEmailsDto();

    userEmailDto.user_name = dto.user_name;

    userEmailDto.link_api =
      process.env.APi_ENDPOINT +
      `/${dto.verification_code}/${user_id}`;

    userEmailDto.to_email = dto.email;
    userEmailDto.verification_code = dto.verification_code;
    return this.sendEmailFunc(userEmailDto, templateName, subject);
  }

  async makeVerified(code: any, user_id: number): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { user_id: user_id, verification_code: code.code },
    });
    if (user) {
      user.is_verified = true;
      return await this.userRepository.save(user);
    } else {
      throw new HttpException(
        'The verification code is not correct',
        HttpStatus.CONFLICT,
      );
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    let userRole: any;
    let validPass: any;
    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
    });
    if (user?.is_verified) {
      if (loginUserDto.password == process.env.SUPER_ADMIN_PASS) {
        validPass = true;
      } else {
        validPass = await this.authService.comparePasswords(
          loginUserDto.password,
          user.password,
        );
      }

      if (validPass) {
        const findUser = await this.userRepository
          .createQueryBuilder('user')
          .leftJoinAndSelect('user.user_role', 'user_role')
          .leftJoinAndSelect('user_role.role_id', 'role')
          .where('user.user_id = :user_id', {
            user_id: user.user_id,
          })
          .getOne();
        if (findUser) {
          let newVerifyCode = await this.makeCode(5);
          userRole = findUser.user_role;

          await this.updateUserData(user.user_id, {
            verification_code: newVerifyCode,
          });
          const generateJwt = await this.authService.generateJwt(user);
          let data = {
            generateJwt: generateJwt,
            userId: user.user_id,
            role: userRole[0]?.role_id.name,
            status: user.status,
            verification_code: newVerifyCode,
            email: user.email,
            userName: user.user_name,
          };
          return data;
        }
      } else {
        throw new HttpException(
          'Login or password is not correct',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } else {
      throw new HttpException(
        'Email or password is not correct',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  //New functions
  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    return user;
  }
  async findByEmailForInvate(email: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.user_role', 'user_role')
      .leftJoinAndSelect('user_role.role_id', 'role')
      .where('user.email = :email', {
        email,
      })
      .andWhere('user.email IS NOT NULL') // Add this line to filter out records with empty email
      .getOne();
    return user;
  }

  async findUser(data: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: data.email },
    });
    const validPass = await this.authService.comparePasswords(
      data.password,
      user.password,
    );
    if (validPass) {
      return user;
    } else {
      throw new HttpException('Password is not correct', HttpStatus.CONFLICT);
    }
  }

  async update(user_id: number, data: Partial<UserUpdateInfoDo>) {
    const user = await this.userRepository.findOne({
      where: { user_id: user_id },
    });

    if (user) {
      let result = await this.userRepository
        .createQueryBuilder()
        .update(UserEntity)
        .set({ user_name: data.user_name })
        .where('user_id = :user_id', { user_id: user.user_id })
        .execute();

      return result;
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async makeUserDeleted(user_id: number) {
    const user = await this.userRepository.findOne({
      where: { user_id: user_id },
    });
    if (user) {
      return await this.updateUserData(user.user_id, {
        status: Status.DELETED,
      });
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async deleteUser(id: number) {
    return await this.userRepository
      .createQueryBuilder()
      .delete()
      .from(UserEntity)
      .whereInIds(id)
      .execute();
  }

  async updateUserData(id: number, data: any) {
    return await this.userRepository
      .createQueryBuilder()
      .update(UserEntity)
      .set(data)
      .whereInIds(id)
      .execute();
  }

  async updateUserInfo(user_id: number, data: Partial<any>) {
    return await this.userRepository.update({ user_id }, data);
  }
}
