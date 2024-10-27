
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from './email.service'; 
import mailerConfig from '../config/mailer.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [mailerConfig], 
    }),
  ],
  providers: [EmailService, ConfigService],
  exports: [EmailService], 
})
export class EmailModule {}