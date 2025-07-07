import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/utils/jwt-auth.guard';
import { UpdateUserDto, UpdateUserRoleDto } from './dto/update-user.dto';
import { UserDto } from './dto/response-user.dto';
import { ResponseUnathorizedDto } from './dto/responses-unathorized.dto';
import {
  ResponseCreateUserConflictDto,
  ResponseUserBadRequestDto,
  ResponseUserConflictDto,
} from './dto/responses-conflict.dto';
import { usersArrayExample } from './examples-schemas/users.example';
import { ResponseUserUpdateDto } from './dto/responses-users-ok.dto';
import {
  STATUS_ACTIVE,
  STATUS_INACTIVE,
} from 'src/common/constants/global-constants';
import { RolesGuard } from 'src/common/utils/roles.guard';

@ApiTags('Usuarios')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear usuario nuevo' })
  @ApiResponse({
    status: 200,
    description: 'Usuario creado exitosamente.',
    type: UserDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Creacion de usuario fallida',
    type: ResponseCreateUserConflictDto,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
    type: ResponseUnathorizedDto,
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(
      createUserDto.email,
      createUserDto.password,
      createUserDto.name,
      createUserDto.lastname,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({
    status: 200,
    description: 'Usuarios obtenidos exitosamente.',
    schema: {
      example: usersArrayExample,
    },
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
    type: ResponseUnathorizedDto,
  })
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':userUuid')
  @ApiOperation({ summary: 'Obtener un usuario' })
  @ApiResponse({
    status: 200,
    description: 'Usuario obtenido exitosamente.',
    type: UserDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Usuario no encontrado.',
    type: ResponseUserConflictDto,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
    type: ResponseUnathorizedDto,
  })
  async findOne(@Param('userUuid') userUuid: string, @Res() response) {
    const userDto = await this.usersService.findUser(userUuid);
    return response.status(HttpStatus.OK).json(userDto);
  }

  @Put(':userUuid')
  @ApiOperation({ summary: 'Actualizar un usuario' })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado exitosamente.',
    type: ResponseUserUpdateDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Usuario no encontrado.',
    type: ResponseUserConflictDto,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
    type: ResponseUnathorizedDto,
  })
  async update(
    @Param('userUuid') userUuid: string,
    @Body() body: UpdateUserDto,
    @Res() response,
  ) {
    const result = await this.usersService.updateUser(
      userUuid,
      body.name,
      body.lastname,
    );
    return response.status(HttpStatus.OK).json(result);
  }

  @Put(':userUuid/role')
  @ApiOperation({ summary: 'Actualizar rol de un usuario' })
  @ApiResponse({
    status: 200,
    description: 'Rol de usuario actualizado exitosamente.',
    type: ResponseUserUpdateDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Usuario no encontrado.',
    type: ResponseUserConflictDto,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
    type: ResponseUnathorizedDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: ResponseUserBadRequestDto,
  })
  async updateUserRole(
    @Param('userUuid') userUuid: string,
    @Body() body: UpdateUserRoleDto,
    @Res() response,
  ) {
    const result = await this.usersService.updateUserRole(
      userUuid,
      body.roleId,
    );
    return response.status(HttpStatus.OK).json(result);
  }

  @Delete(':userUuid')
  @ApiOperation({ summary: 'Deshabiltar un usuario' })
  @ApiResponse({
    status: 200,
    description: 'Usuario deshabilitado exitosamente.',
    type: ResponseUserUpdateDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Usuario no encontrado.',
    type: ResponseUserConflictDto,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
    type: ResponseUnathorizedDto,
  })
  async remove(@Param('userUuid') userUuid: string) {
    return await this.usersService.removeOrEnableUser(
      userUuid,
      STATUS_INACTIVE,
    );
  }

  @Put(':userUuid/activate')
  @ApiOperation({ summary: 'Habiltar un usuario' })
  @ApiResponse({
    status: 200,
    description: 'Usuario Habilitado exitosamente.',
    type: ResponseUserUpdateDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Usuario no encontrado.',
    type: ResponseUserConflictDto,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
    type: ResponseUnathorizedDto,
  })
  async enable(@Param('userUuid') userUuid: string) {
    return await this.usersService.removeOrEnableUser(userUuid, STATUS_ACTIVE);
  }
}
