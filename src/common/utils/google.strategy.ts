import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private config: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: config.get('GOOGLE_CLIENT_ID'),
      clientSecret: config.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: config.get('GOOGLE_CALLBACK_URL'),
      scope: ['profile', 'email'],
      passReqToCallback: false,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    /*  Extraemos la información relevante y delegamos en el servicio  */
    const user = await this.authService.googleValidateOrCreate({
      googleId: profile.id,
      email: profile.email,
      name: profile.given_name,
      lastname: profile.family_name,
      picture: profile.picture,
      accessToken,
      refreshToken,
    });

    return done(null, { userUuid: user.userUuid }); // se inyectará como userUuid en el request
  }
}
