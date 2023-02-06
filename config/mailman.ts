import { MailmanOptions } from '@/nest-mailman';
import { registerAs } from '@nestjs/config';
import { join } from 'path';

export default registerAs('mailman', () => {
  return {
    host: process.env.MAIL_HOST,
    port: +process.env.MAIL_PORT,
    username: process.env.MAIL_USERNAME,
    password: process.env.MAIL_PASSWORD,
    from: process.env.MAIL_SENDER_ID,
    path: join(__dirname, '../..', `/resources/mail-templates`),
  } as MailmanOptions;
});
