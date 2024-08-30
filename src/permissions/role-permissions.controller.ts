import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/utils/jwt-auth.guard';
import { PermissionsService } from './permissions.service';
import { ResponseUnathorizedDto } from 'src/users/dto/responses-unathorized.dto';
import { CreateRolePermissionsDto } from './dto/create-role-permissions.dto';
import { ResponseCreatePermissionConflictDto } from './dto/responses-conflict.dto';
import { RolePermissionsAsingDto } from './dto/response-permission.dto';
import {
  controllersActionsArrayExample,
  rolePermissionsArrayExample,
} from './examples-schemas/permissions.example';
import { RolesGuard } from 'src/common/utils/roles.guard';

@ApiTags('Permisos por Rol')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('role-permissions')
export class RolePermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get('controllers-actions')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary:
      'Obtener todos los nombres de todos los controladores y sus acciones',
  })
  @ApiResponse({
    status: 200,
    description: 'Controladores y acciones obtenidos exitosamente.',
    schema: {
      example: controllersActionsArrayExample,
    },
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
    type: ResponseUnathorizedDto,
  })
  async findAllControllersAndActions() {
    return await this.permissionsService.findAllControllersAndActions();
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obtener todos los permisos por role' })
  @ApiResponse({
    status: 200,
    description: 'Permisos por rol obtenidos exitosamente.',
    schema: {
      example: rolePermissionsArrayExample,
    },
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
    type: ResponseUnathorizedDto,
  })
  async findAll() {
    return await this.permissionsService.findAllRolePermissions();
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Asignar roles a permiso' })
  @ApiResponse({
    status: 201,
    description: 'Roles asignados correctamente al permiso.',
    type: RolePermissionsAsingDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Asignacion de roles fallido',
    type: ResponseCreatePermissionConflictDto,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
    type: ResponseUnathorizedDto,
  })
  async asingRolesToPermission(
    @Body() createRolePermissionsDto: CreateRolePermissionsDto,
  ) {
    return await this.permissionsService.asingRolesToPermission(
      createRolePermissionsDto.permissionId,
      createRolePermissionsDto.roles,
    );
  }
}
