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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/utils/jwt-auth.guard';
import { RolesService } from './roles.service';
import { RoleDto } from './dto/response-role.dto';
import {
  ResponseCreateRoleConflictDto,
  ResponseRoleConflictDto,
} from './dto/responses-conflict.dto';
import { ResponseUnathorizedDto } from 'src/users/dto/responses-unathorized.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { rolesArrayExample } from './examples-schemas/roles.example';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ResponseRoleUpdateDto } from './dto/responses-role-ok.dto';
import {
  STATUS_ACTIVE,
  STATUS_INACTIVE,
} from 'src/common/constants/global-constants';
import { RolesGuard } from 'src/common/utils/roles.guard';

@ApiTags('Roles')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Crear un rol nuevo' })
  @ApiResponse({
    status: 200,
    description: 'Rol creado exitosamente.',
    type: RoleDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Creacion de rol fallida',
    type: ResponseCreateRoleConflictDto,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
    type: ResponseUnathorizedDto,
  })
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.rolesService.createRole(
      createRoleDto.name,
      createRoleDto.description,
    );
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obtener todos los roles' })
  @ApiResponse({
    status: 200,
    description: 'Roles obtenidos exitosamente.',
    schema: {
      example: rolesArrayExample,
    },
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
    type: ResponseUnathorizedDto,
  })
  async findAll() {
    return await this.rolesService.findAll();
  }

  @Get(':roleId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obtener un rol' })
  @ApiResponse({
    status: 200,
    description: 'Rol obtenido exitosamente.',
    type: RoleDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Rol no encontrado.',
    type: ResponseRoleConflictDto,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
    type: ResponseUnathorizedDto,
  })
  async findOne(@Param('roleId') roleId: number, @Res() response) {
    const roleDto = await this.rolesService.findRole(+roleId);
    return response.status(HttpStatus.OK).json(roleDto);
  }

  @Put(':roleId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Actualizar un rol' })
  @ApiResponse({
    status: 200,
    description: 'Rol actualizado exitosamente.',
    type: ResponseRoleUpdateDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Rol no encontrado.',
    type: ResponseRoleConflictDto,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
    type: ResponseUnathorizedDto,
  })
  async update(
    @Param('roleId') roleId: string,
    @Body() body: UpdateRoleDto,
    @Res() response,
  ) {
    const result = await this.rolesService.updateRole(
      +roleId,
      body.name,
      body.description,
    );
    return response.status(HttpStatus.OK).json(result);
  }

  @Delete(':roleId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Deshabiltar un rol' })
  @ApiResponse({
    status: 200,
    description: 'Rol deshabilitado exitosamente.',
    type: ResponseRoleUpdateDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Rol no encontrado.',
    type: ResponseRoleConflictDto,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
    type: ResponseUnathorizedDto,
  })
  async remove(@Param('roleId') roleId: string) {
    return await this.rolesService.removeOrEnableRole(+roleId, STATUS_INACTIVE);
  }

  @Put(':roleId/activate')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Habiltar un usuario' })
  @ApiResponse({
    status: 200,
    description: 'Usuario Habilitado exitosamente.',
    type: ResponseRoleUpdateDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Usuario no encontrado.',
    type: ResponseRoleConflictDto,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
    type: ResponseUnathorizedDto,
  })
  async enable(@Param('roleId') roleId: string) {
    return await this.rolesService.removeOrEnableRole(+roleId, STATUS_ACTIVE);
  }
}
