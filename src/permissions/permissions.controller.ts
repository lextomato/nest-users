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
import { PermissionsService } from './permissions.service';
import { PermissionDto } from './dto/response-permission.dto';
import { ResponseCreateRoleConflictDto } from 'src/roles/dto/responses-conflict.dto';
import { ResponseUnathorizedDto } from 'src/users/dto/responses-unathorized.dto';
import { CreatePermissionDto } from './dto/create-permission.dto';
import {
  permissionsArrayExample,
  permissionsGroupByControllerArrayExample,
} from './examples-schemas/permissions.example';
import { ResponsePermissionConflictDto } from './dto/responses-conflict.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import {
  STATUS_ACTIVE,
  STATUS_INACTIVE,
} from 'src/common/constants/global-constants';
import { RolesGuard } from 'src/common/utils/roles.guard';
import { ResponsePermissionUpdateDto } from './dto/responses-permission-ok.dto';

@ApiTags('Permisos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un permiso nuevo' })
  @ApiResponse({
    status: 200,
    description: 'Permiso creado exitosamente.',
    type: PermissionDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Creacion de permiso fallido',
    type: ResponseCreateRoleConflictDto,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
    type: ResponseUnathorizedDto,
  })
  async create(@Body() createPermissionDto: CreatePermissionDto) {
    return await this.permissionsService.createPermission(
      createPermissionDto.controller,
      createPermissionDto.action,
      createPermissionDto.path,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los permisos' })
  @ApiResponse({
    status: 200,
    description: 'Permisos obtenidos exitosamente.',
    schema: {
      example: permissionsArrayExample,
    },
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
    type: ResponseUnathorizedDto,
  })
  async findAll() {
    return await this.permissionsService.findAll();
  }

  @Get('group-by-controller')
  @ApiOperation({
    summary: 'Obtener todos los permisos agrupados por controlador',
  })
  @ApiResponse({
    status: 200,
    description: 'Permisos agrupados obtenidos exitosamente.',
    schema: {
      example: permissionsGroupByControllerArrayExample,
    },
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
    type: ResponseUnathorizedDto,
  })
  async findAllGroupByController() {
    return await this.permissionsService.findAllGroupByController();
  }

  @Get(':permissionId')
  @ApiOperation({ summary: 'Obtener un permiso' })
  @ApiResponse({
    status: 200,
    description: 'Permiso obtenido exitosamente.',
    type: PermissionDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Permiso no encontrado.',
    type: ResponsePermissionConflictDto,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
    type: ResponseUnathorizedDto,
  })
  async findOne(@Param('permissionId') permissionId: number, @Res() response) {
    const permissionDto =
      await this.permissionsService.findPermission(+permissionId);
    return response.status(HttpStatus.OK).json(permissionDto);
  }

  @Put(':permissionId')
  @ApiOperation({ summary: 'Actualizar un permiso' })
  @ApiResponse({
    status: 200,
    description: 'Permiso actualizado exitosamente.',
    type: ResponsePermissionUpdateDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Permiso no encontrado.',
    type: ResponsePermissionConflictDto,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
    type: ResponseUnathorizedDto,
  })
  async update(
    @Param('permissionId') permissionId: string,
    @Body() body: UpdatePermissionDto,
    @Res() response,
  ) {
    const result = await this.permissionsService.update(
      +permissionId,
      body.controller,
      body.action,
      body.path,
    );
    return response.status(HttpStatus.OK).json(result);
  }

  @Delete(':permissionId')
  @ApiOperation({ summary: 'Deshabiltar un permiso' })
  @ApiResponse({
    status: 200,
    description: 'Permiso deshabilitado exitosamente.',
    type: ResponsePermissionUpdateDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Permiso no encontrado.',
    type: ResponsePermissionConflictDto,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
    type: ResponseUnathorizedDto,
  })
  async remove(@Param('permissionId') permissionId: string) {
    return await this.permissionsService.removeOrEnable(
      +permissionId,
      STATUS_INACTIVE,
    );
  }

  @Put(':permissionId/activate')
  @ApiOperation({ summary: 'Habiltar un permiso' })
  @ApiResponse({
    status: 200,
    description: 'Permiso Habilitado exitosamente.',
    type: ResponsePermissionUpdateDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Permiso no encontrado.',
    type: ResponsePermissionConflictDto,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
    type: ResponseUnathorizedDto,
  })
  async enable(@Param('permissionId') permissionId: string) {
    return await this.permissionsService.removeOrEnable(
      +permissionId,
      STATUS_ACTIVE,
    );
  }
}
