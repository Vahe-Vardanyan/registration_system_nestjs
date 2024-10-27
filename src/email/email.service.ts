import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';
import * as Handlebars from 'handlebars';
import { generateEmailTemplateForVerifyCode } from './templates/verificationCode';
import { UserEmailsDto } from './dto/user_registration.dto';
import { generateEmailTemplateForVerification } from './templates/verification';

@Injectable()
export class EmailService {
  private readonly transporter: Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = createTransport(
      this.configService.get('mailer.transport'),
    );
  }

  async sendEmail(
    dto: UserEmailsDto,
    to: string,
    subject: string,
    templateName: any,
    context: Record<string, any>,
  ): Promise<void> {
    try {
      let emailTemplate: any;
      if (templateName == 'verificationCode') {
        emailTemplate = generateEmailTemplateForVerifyCode(
          dto.user_name,
          dto.verification_code,
        );
      } else if (templateName == 'verification') {
        emailTemplate = generateEmailTemplateForVerification(
          dto.user_name,
          dto.link_api,
        );
      } 
      // Compile the template
      const template = Handlebars.compile(emailTemplate);

      // Render the email body using the provided context
      const html = template(context);

      const mailOptions = {
        from: this.configService.get('mailer.defaults.from'),
        to,
        subject,
        html, // Use the rendered HTML as the email body
      };

      let result = await this.transporter.sendMail(mailOptions);
      return result;
    } catch (error) {
      return error;
    }
  }
}
