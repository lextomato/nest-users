import { DynamicModule, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import * as nodemailer from 'nodemailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailTemplates } from './interface/email-template.interface';
import { DEFAULT_TEMPLATES } from 'src/common/constants/global-constants';

@Module({
  imports: [ConfigModule],
})
export class MailModule {
  static forRoot(templates: EmailTemplates = {}): DynamicModule {
    return {
      module: MailModule,
      providers: [
        {
          provide: 'EMAIL_TRANSPORT',
          useFactory: async (configService: ConfigService) => {
            const transporter = nodemailer.createTransport({
              host: configService.get<string>('EMAIL_HOST'),
              port: configService.get<number>('EMAIL_PORT'),
              secure: configService.get<boolean>('EMAIL_SECURE'),
              auth: {
                user: configService.get<string>('EMAIL_USER'),
                pass: configService.get<string>('EMAIL_PASS'),
              },
              tls: {
                rejectUnauthorized: false,
              },
            });

            return transporter;
          },
          inject: [ConfigService],
        },
        {
          provide: 'EMAIL_TEMPLATES',
          useValue: { ...DEFAULT_TEMPLATES, ...templates },
        },
        MailService,
      ],
      exports: ['EMAIL_TRANSPORT', 'EMAIL_TEMPLATES', MailService],
    };
  }
}
