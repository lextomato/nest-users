import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import {
  STATUS_ACTIVE,
  STATUS_INACTIVE,
} from 'src/common/constants/global-constants';
import { SessionEntity } from 'src/common/entities/sessions.entity';
import { UsersEntity } from 'src/common/entities/users.entity';
import { hashPassword } from 'src/common/utils/tools';
import { PasswordRecoveryEntity } from 'src/common/entities/password-recovery.entity';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from 'src/mail/mail.service';
import { addMinutes } from 'date-fns';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,

    @InjectRepository(SessionEntity)
    private sessionRepository: Repository<SessionEntity>,

    @InjectRepository(PasswordRecoveryEntity)
    private passwordRecoveryRepository: Repository<PasswordRecoveryEntity>,

    private readonly mailService: MailService,
  ) {}

  async login(
    email: string,
    pass: string,
    ip: string,
    userAgent: string,
  ): Promise<any> {
    const user = await this.usersRepository.findOneBy({
      email: email,
      active: STATUS_ACTIVE,
    });
    if (!user)
      throw new HttpException(
        {
          status: 'error',
          message: 'Email incorrecto.',
        },
        HttpStatus.CONFLICT,
      );
    const isAuth = await this.comparePasswords(pass, user?.passwordHash);
    if (!isAuth)
      throw new HttpException(
        {
          status: 'error',
          message: 'Contraseña incorrecta.',
        },
        HttpStatus.CONFLICT,
      );

    const expiresIn = '7d';
    const token = jwt.sign(
      { userUuid: user.userUuid },
      process.env.JWT_SECRET,
      {
        expiresIn,
      },
    );
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);

    const session = new SessionEntity();
    session.userUuid = user.userUuid;
    session.ipAddress = ip;
    session.userAgent = userAgent;
    session.expiresAt = expirationDate;
    session.token = token;

    await this.sessionRepository.update(
      { userUuid: user.userUuid },
      { active: STATUS_INACTIVE },
    );
    this.sessionRepository.save(session);

    return { login: isAuth, token: token, userUuid: user.userUuid };
  }

  async logout(token: string): Promise<any> {
    const result = await this.sessionRepository.update(
      { token: token },
      { active: STATUS_INACTIVE },
    );
    const isLogout = result.affected === 1 ? true : false;
    if (!isLogout)
      throw new HttpException(
        {
          status: 'error',
          message: 'Token invalido.',
        },
        HttpStatus.CONFLICT,
      );
    return { logout: isLogout };
  }

  async checksession(
    token: string,
  ): Promise<{ isSessionValid: boolean; userUuid: string }> {
    const session = await this.sessionRepository.findOneBy({ token });
    if (!session)
      throw new HttpException(
        {
          status: 'error',
          message: 'Token invalido.',
        },
        HttpStatus.CONFLICT,
      );

    const isSessionValid =
      session.active && session.expiresAt > new Date() ? true : false;
    const userUuid = session.userUuid;
    return { isSessionValid: isSessionValid, userUuid: userUuid };
  }

  async changePassword(
    userUuid: string,
    password: string,
  ): Promise<{ update: boolean }> {
    const user = await this.usersRepository.findOneBy({
      userUuid: userUuid,
      active: STATUS_ACTIVE,
    });
    if (!user)
      throw new HttpException(
        {
          status: 'error',
          message: 'Usuario no existe o esta deshabilitado.',
          userUuid: userUuid,
        },
        HttpStatus.CONFLICT,
      );

    user.passwordHash = await hashPassword(password);
    const result = await this.usersRepository.update(
      { userUuid: user.userUuid },
      user,
    );

    return { update: result.affected > 0 };
  }

  async resetPassword(
    token: string,
    password: string,
  ): Promise<{ update: boolean }> {
    const passwordRecovery = await this.passwordRecoveryRepository.findOneBy({
      token: token,
      active: STATUS_ACTIVE,
    });
    if (!passwordRecovery)
      throw new HttpException(
        {
          status: 'error',
          message: 'Token invalido.',
          token: token,
        },
        HttpStatus.CONFLICT,
      );

    const isExpired = passwordRecovery.expiresAt < new Date();
    if (isExpired)
      throw new HttpException(
        {
          status: 'error',
          message: 'Token expirado.',
          token: token,
        },
        HttpStatus.BAD_REQUEST,
      );

    const result = await this.changePassword(
      passwordRecovery.userUuid,
      password,
    );

    if (result.update) {
      await this.sessionRepository.update(
        { userUuid: passwordRecovery.userUuid },
        { active: STATUS_INACTIVE },
      );

      await this.passwordRecoveryRepository.update(
        { userUuid: passwordRecovery.userUuid },
        { active: STATUS_INACTIVE },
      );
    }

    return result;
  }

  async forgotPassword(email: string): Promise<{ result: boolean }> {
    const user = await this.usersRepository.findOneBy({
      email: email,
      active: STATUS_ACTIVE,
    });
    if (!user)
      throw new HttpException(
        {
          status: 'error',
          message: 'Email no existe.',
        },
        HttpStatus.CONFLICT,
      );

    const newPasswordRecovery = new PasswordRecoveryEntity();
    newPasswordRecovery.token = uuidv4();
    newPasswordRecovery.expiresAt = addMinutes(new Date(), 30); // Expiración en 30 minutos
    newPasswordRecovery.userUuid = user.userUuid;

    await this.passwordRecoveryRepository.update(
      { userUuid: user.userUuid },
      { active: STATUS_INACTIVE },
    );
    this.passwordRecoveryRepository.save(newPasswordRecovery);

    // Generar el enlace de recuperación de contraseña
    const appDomain = process.env.APP_DOMAIN; // Dominio base de la aplicación desde el .env
    const endpointFrontend = process.env.ENDPOINT_FROM_RECOVERY_PASS; // Enpoint del formulario de recuperacion de contraseña de la aplicación desde el .env
    const recoveryLink = `${appDomain}${endpointFrontend}?token=${newPasswordRecovery.token}&email=${email}`;

    // Enviar correo electrónico de activación
    await this.mailService.sendMail(
      user.email,
      'Recuperacion de contraseña',
      'passwordRecovery',
      { name: user.name, lastname: user.lastname, link: recoveryLink },
    );

    return { result: true };
  }

  private async comparePasswords(
    password: string,
    storedPasswordHash: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, storedPasswordHash);
  }
}
