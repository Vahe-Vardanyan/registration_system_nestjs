import { registerAs } from '@nestjs/config';

export default registerAs('mailer', () => ({
  transport: {
    host: process.env.MAILER_HOST,
    port: parseInt(process.env.MAILER_PORT, 10),
    secure: process.env.MAILER_SECURE === 'true',
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS,
    },
  },
  defaults: {
    from: process.env.MAILER_DEFAULT_FROM,
  },
}));