import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async validate(req: Request, payload: any) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

    // Verifica si el token está en la lista de revocados
    const session = await this.authService.checksession(token);
    if (!session.isSessionValid)
      throw new HttpException(
        {
          status: 'error',
          message: 'El Token ha sido revocado.',
        },
        HttpStatus.CONFLICT,
      );

    // Si el token es válido, continúa con la validación
    return { userId: payload.sub, userUuid: session.userUuid };
  }
}
