import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  Ip,
  Put,
  UseGuards,
  Param,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RequestLoginDto } from './dto/request-login.dto';
import { RequestTokenDto } from './dto/request-token.dto';
import {
  ResponseCheckSessionDto,
  ResponseForgotPasswordDto,
  ResponseLoginDto,
  ResponseLogoutDto,
  ResponseUpdateDto,
} from './dto/responses-auth-ok.dto';
import {
  ResponseTokenConflictDto,
  ResponseLoginConflictDto,
  ResponseUserConflictDto,
  ResponseTokenBadRequestDto,
  ResponseInternalErrorDto,
} from './dto/responses-conflict.dto';
import { JwtAuthGuard } from 'src/common/utils/jwt-auth.guard';
import { RequestChangePasswordDto } from './dto/request-chamge-password.dto';
import { ResponseAuthUnathorizedDto } from './dto/responses-unathorized.dto';
import { RequestForgotPasswordDto } from './dto/request-forgot-password.dto';
import { RolesGuard } from 'src/common/utils/roles.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('checksession')
  @ApiOperation({ summary: 'Chequear sesion valida por token' })
  @ApiResponse({
    status: 200,
    description: 'Sesion valida.',
    type: ResponseCheckSessionDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Sesion invalida.',
    type: ResponseTokenConflictDto,
  })
  async checksession(@Body() body: RequestTokenDto, @Res() response) {
    const result = await this.authService.checksession(body.token);
    return response.status(HttpStatus.OK).json(result);
  }

  @Post('login')
  @ApiOperation({ summary: 'Inicio de sesion de usuario' })
  @ApiResponse({
    status: 200,
    description: 'Login exitoso.',
    type: ResponseLoginDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Login fallido.',
    type: ResponseLoginConflictDto,
  })
  async login(
    @Body() body: RequestLoginDto,
    @Req() req: Request,
    @Ip() ip,
    @Res() response,
  ) {
    const userAgent = req.headers['user-agent'];
    const result = await this.authService.login(
      body.email,
      body.password,
      ip,
      userAgent,
    );
    return response.status(HttpStatus.OK).json(result);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Cierre de sesion de usuario' })
  @ApiResponse({
    status: 200,
    description: 'Logout exitoso.',
    type: ResponseLogoutDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Logout fallido.',
    type: ResponseTokenConflictDto,
  })
  async logout(@Body() body: RequestTokenDto, @Res() response) {
    const result = await this.authService.logout(body.token);
    return response.status(HttpStatus.OK).json(result);
  }

  @Put('change-password/:userUuid')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Cambiar contraseña de un usuario' })
  @ApiResponse({
    status: 200,
    description: 'Contraseña actualizada exitosamente.',
    type: ResponseUpdateDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Usuario no encontrado.',
    type: ResponseUserConflictDto,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
    type: ResponseAuthUnathorizedDto,
  })
  async changePassword(
    @Param('userUuid') userUuid: string,
    @Body() body: RequestChangePasswordDto,
    @Res() response,
  ) {
    if (!userUuid)
      throw new HttpException(
        {
          status: 'nok',
          message: "El parámetro 'userUuid' es obligatorio",
        },
        HttpStatus.BAD_REQUEST,
      );
    const result = await this.authService.changePassword(
      userUuid,
      body.password,
    );
    return response.status(HttpStatus.OK).json(result);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Olvido de contraseña' })
  @ApiResponse({
    status: 200,
    description: 'Correo de recuperacion de contraseña enviado exitosamente.',
    type: ResponseForgotPasswordDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Usuario no encontrado.',
    type: ResponseUserConflictDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor.',
    type: ResponseInternalErrorDto,
  })
  async forgotPassword(
    @Body() body: RequestForgotPasswordDto,
    @Res() response,
  ) {
    const result = await this.authService.forgotPassword(body.email);
    return response.status(HttpStatus.OK).json(result);
  }

  @Post('reset-password/:token')
  @ApiOperation({ summary: 'Reseteo de contraseña' })
  @ApiResponse({
    status: 200,
    description: 'Contraseña actualizada exitosamente.',
    type: ResponseForgotPasswordDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Token invalido.',
    type: ResponseTokenConflictDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Token expirado.',
    type: ResponseTokenBadRequestDto,
  })
  async resetPassword(
    @Param('token') token: string,
    @Body() body: RequestChangePasswordDto,
    @Res() response,
  ) {
    if (!token)
      throw new HttpException(
        {
          status: 'nok',
          message: "El parámetro 'token' es obligatorio",
        },
        HttpStatus.BAD_REQUEST,
      );
    const result = await this.authService.resetPassword(token, body.password);
    return response.status(HttpStatus.OK).json(result);
  }
}
