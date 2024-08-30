import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionsService } from 'src/permissions/permissions.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
    private permissionsService: PermissionsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user)
      throw new HttpException(
        {
          status: 'nok',
          message: 'Usuario no autenticado.',
        },
        HttpStatus.FORBIDDEN,
      );

    // Obtener metadata del controlador y la acción
    const handler = context.getHandler();
    const controller = context.getClass();

    const controllerName = controller.name; // Asume que el nombre del módulo es el nombre del controlador
    const actionName = handler.name; // El nombre del método controlador es la acción

    // Obtener el permiso para el módulo y acción
    const permission: any =
      await this.permissionsService.getPermissionForControllerAction(
        controllerName,
        actionName,
      );

    if (!permission) return true; // No hay permiso creado para el controller y la action y deja pasar

    // Verificar si el rol del usuario tiene permiso
    const rolesWithPermission =
      await this.permissionsService.getRolesForPermission(
        permission.permissionId,
      );

    if (rolesWithPermission.length <= 0) return true; // No hay roles asignados al permiso y deja pasar

    // Obtener el rol del usuario desde la base de datos
    const userWithRole = await this.usersService.findUserWithRole(
      user.userUuid,
    );

    if (!rolesWithPermission.includes(userWithRole.roleId))
      throw new HttpException(
        {
          status: 'nok',
          message: 'No tienes permisos para acceder a este recurso.',
        },
        HttpStatus.FORBIDDEN,
      );

    return true;
  }
}
