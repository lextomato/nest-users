import {
  HttpException,
  HttpStatus,
  Injectable,
  RequestMethod,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionsEntity } from 'src/common/entities/permissions.entity';
import { RolePermissionsEntity } from 'src/common/entities/role-permissions.entity';
import { In, Repository } from 'typeorm';
import { PermissionDto } from './dto/response-permission.dto';
import { plainToInstance } from 'class-transformer';
import {
  STATUS_ACTIVE,
  STATUS_INACTIVE,
} from 'src/common/constants/global-constants';
import { RolesEntity } from 'src/common/entities/roles.entity';
import { RolePermissionsDto } from './dto/response-role-permissions.dto';
import { DiscoveryService, Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsService {
  constructor(
    private readonly reflector: Reflector,
    private readonly discoveryService: DiscoveryService,
    @InjectRepository(RolePermissionsEntity)
    private rolePermissionsRepository: Repository<RolePermissionsEntity>,
    @InjectRepository(PermissionsEntity)
    private permissionsRepository: Repository<PermissionsEntity>,
    @InjectRepository(RolesEntity)
    private rolesRepository: Repository<RolesEntity>,
  ) {}

  private async scanControllers() {
    const controllers = this.discoveryService.getControllers();
    const controllerActions = await Promise.all(
      controllers
        .filter(({ instance }) => !!instance)
        .map(async ({ instance }) => {
          const controllerName = instance.constructor.name;
          const controllerPath = this.reflector.get<string>(
            'path',
            instance.constructor,
          );
          const prototype = Object.getPrototypeOf(instance);
          const methods = Object.getOwnPropertyNames(prototype).filter(
            (method) =>
              method !== 'constructor' &&
              typeof prototype[method] === 'function',
          );

          const actions = await Promise.all(
            methods.map(async (methodName) => {
              const methodPath = this.reflector.get<string>(
                'path',
                prototype[methodName],
              );
              const requestMethodNumber = this.reflector.get<number>(
                'method',
                prototype[methodName],
              );
              const requestMethod = RequestMethod[requestMethodNumber];
              const methodPathFormatted =
                methodPath === '/' ? '' : `/${methodPath}`;
              const fullPath =
                controllerPath && methodPath
                  ? `/${controllerPath}${methodPathFormatted}`
                  : null;

              const permissions = await this.permissionsRepository.find({
                where: {
                  controller: controllerName,
                  action: methodName,
                },
              });

              const permissionInUse = permissions.length > 0;

              return {
                action: methodName,
                path: fullPath,
                method: requestMethod?.toUpperCase() || 'UNKNOWN', // Obtener el tipo de petición HTTP como texto
                permissionInUse: permissionInUse,
              };
            }),
          );

          return {
            controller: controllerName,
            actions: actions,
          };
        }),
    );

    return controllerActions;
  }

  async findAllControllersAndActions() {
    return await this.scanControllers();
  }

  // Obtener el permissionId para un módulo y acción específicos
  async getPermissionForControllerAction(
    controllerName: string,
    actionName: string,
  ): Promise<PermissionsEntity | boolean> {
    const permission = await this.permissionsRepository.findOne({
      where: {
        controller: controllerName,
        action: actionName,
        active: STATUS_ACTIVE,
      },
    });

    if (!permission) {
      return false;
    }

    return permission;
  }

  // Obtener roles con permisos específicos
  async getRolesForPermission(permissionId: number): Promise<number[]> {
    const rolePermissions = await this.rolePermissionsRepository.find({
      where: { permissionId: permissionId, active: STATUS_ACTIVE },
    });

    return rolePermissions.map((rp) => rp.roleId);
  }

  async createPermission(
    controller: string,
    action: string,
    path: string,
  ): Promise<PermissionDto> {
    const existingPermission = await this.permissionsRepository.findOneBy({
      controller: controller,
      action: action,
    });
    if (existingPermission)
      throw new HttpException(
        {
          status: 'error',
          message: 'El permiso ya existe.',
          controller: controller,
          action: action,
        },
        HttpStatus.CONFLICT,
      );

    const newPermission = new PermissionsEntity();
    newPermission.controller = controller;
    newPermission.action = action;
    newPermission.path = path;
    return this.permissionsRepository.save(newPermission);
  }

  async asingRolesToPermission(
    permissionId: number,
    roles: number[],
  ): Promise<any> {
    const existingPermission = await this.permissionsRepository.findOneBy({
      permissionId,
      active: STATUS_ACTIVE,
    });
    if (!existingPermission)
      throw new HttpException(
        {
          status: 'error',
          message: 'No se encuentra el permiso.',
          permissionId: permissionId,
        },
        HttpStatus.CONFLICT,
      );

    const existingRoles = await this.rolesRepository.findBy({
      roleId: In(roles),
      active: STATUS_ACTIVE,
    });

    if (existingRoles.length !== roles.length) {
      throw new HttpException(
        {
          status: 'nok',
          message: 'Uno o más roles no existen.',
          missingRoles: roles.filter(
            (roleId) => !existingRoles.some((role) => role.roleId === roleId),
          ),
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.rolePermissionsRepository.update(
      { permissionId: permissionId },
      { active: STATUS_INACTIVE },
    );

    if (roles.length > 0) {
      const rolePermissions = roles.map((roleId) => ({
        permissionId: existingPermission.permissionId,
        roleId,
        active: true,
        updatedAt: () => 'NOW()',
      }));

      await this.rolePermissionsRepository
        .createQueryBuilder()
        .insert()
        .into(RolePermissionsEntity)
        .values(rolePermissions)
        .orUpdate(['active', 'updatedAt'], ['roleId', 'permissionId'])
        .execute();
    }

    return {
      status: 'ok',
      message: 'Roles asignados correctamente al permiso.',
    };
  }

  async findAllRolePermissions(): Promise<RolePermissionsDto[]> {
    const rolePermissions = await this.rolePermissionsRepository.find({
      where: {
        active: STATUS_ACTIVE,
      },
      relations: ['role', 'permission'],
      order: {
        permissionId: 'ASC',
      },
    });
    const dto = plainToInstance(RolePermissionsDto, rolePermissions, {
      excludeExtraneousValues: true,
    });

    return dto;
  }

  private async findRolesOfPermissionsByControllerAndAction(
    controller: string,
    action: string,
  ): Promise<any[]> {
    const rolePermissions = await this.rolePermissionsRepository.find({
      where: {
        active: STATUS_ACTIVE,
        permission: {
          controller: controller,
          action: action,
        },
      },
      relations: ['role', 'permission'],
      order: {
        role: {
          roleId: 'ASC',
        },
      },
    });
    const roles = rolePermissions
      .map((el) => {
        return {
          roleId: el.roleId,
          name: el.role.name,
          active: el.role.active,
        };
      })
      .sort((a, b) => a.roleId - b.roleId);

    return roles;
  }

  async findAll(): Promise<PermissionDto[]> {
    const permissions = await this.permissionsRepository.find({
      order: {
        permissionId: 'ASC',
      },
    });
    return plainToInstance(PermissionDto, permissions, {
      excludeExtraneousValues: true,
    });
  }

  async findAllGroupByController(): Promise<any> {
    const permissions = await this.permissionsRepository.find({
      order: {
        permissionId: 'ASC',
      },
    });

    const groupedPermissions = [];

    for (const permission of permissions) {
      const { controller, action, path, permissionId, active } = permission;

      let controllerGroup = groupedPermissions.find(
        (group) => group.controller === controller,
      );

      if (!controllerGroup) {
        controllerGroup = {
          controller,
          actions: [],
        };
        groupedPermissions.push(controllerGroup);
      }

      const roles = await this.findRolesOfPermissionsByControllerAndAction(
        controller,
        action,
      );

      controllerGroup.actions.push({
        permissionId,
        action,
        path,
        active,
        roles,
      });
    }

    return groupedPermissions;
  }

  async findPermission(permissionId: number): Promise<any> {
    const existingPermission = await this.permissionsRepository.findOneBy({
      permissionId,
      active: STATUS_ACTIVE,
    });
    if (!existingPermission)
      throw new HttpException(
        {
          status: 'error',
          message: 'No se encuentra el permiso.',
          permissionId: permissionId,
        },
        HttpStatus.CONFLICT,
      );

    const permissionDto = new PermissionDto();
    permissionDto.controller = existingPermission.controller;
    permissionDto.action = existingPermission.action;
    permissionDto.path = existingPermission.path;
    permissionDto.active = existingPermission.active;
    return permissionDto;
  }

  async update(
    permissionId: number,
    controller: string,
    action: string,
    path: string,
  ): Promise<any> {
    const existingPermission = await this.permissionsRepository.findOneBy({
      permissionId,
      active: STATUS_ACTIVE,
    });
    if (!existingPermission)
      throw new HttpException(
        {
          status: 'error',
          message: 'No se encuentra el permiso.',
          permissionId: permissionId,
        },
        HttpStatus.CONFLICT,
      );

    const existingPermissionAction = await this.permissionsRepository.findOneBy(
      {
        controller: controller,
        action: action,
      },
    );
    if (existingPermissionAction)
      throw new HttpException(
        {
          status: 'error',
          message: 'El permiso ya existe.',
          controller: controller,
          action: action,
        },
        HttpStatus.CONFLICT,
      );

    existingPermission.controller = controller;
    existingPermission.action = action;
    existingPermission.path = path;

    const result = await this.permissionsRepository.update(
      { permissionId: existingPermission.permissionId },
      existingPermission,
    );

    return { update: result.affected > 0 };
  }

  async removeOrEnable(permissionId: number, activate: boolean): Promise<any> {
    const existingPermission = await this.permissionsRepository.findOneBy({
      permissionId,
      active: activate ? STATUS_INACTIVE : STATUS_ACTIVE,
    });
    if (!existingPermission)
      throw new HttpException(
        {
          status: 'error',
          message: 'No se encuentra el permiso.',
          permissionId: permissionId,
        },
        HttpStatus.CONFLICT,
      );

    existingPermission.active = activate ? STATUS_ACTIVE : STATUS_INACTIVE;

    const result = await this.permissionsRepository.update(
      { permissionId: existingPermission.permissionId },
      existingPermission,
    );

    return { update: result.affected > 0 };
  }
}
