import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  STATUS_ACTIVE,
  STATUS_INACTIVE,
} from 'src/common/constants/global-constants';
import { RolesEntity } from 'src/common/entities/roles.entity';
import { Repository } from 'typeorm';
import { RoleDto } from './dto/response-role.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesEntity)
    private rolesRepository: Repository<RolesEntity>,
  ) {}

  async createRole(name: string, description: string): Promise<RoleDto> {
    const existingRole = await this.rolesRepository.findOneBy({
      name: name,
    });
    if (existingRole)
      throw new HttpException(
        {
          status: 'error',
          message: 'El rol ya existe.',
          role: name,
        },
        HttpStatus.CONFLICT,
      );

    const newRole = new RolesEntity();
    newRole.name = name;
    newRole.description = description;
    return this.rolesRepository.save(newRole);
  }

  async findAll(): Promise<RoleDto[]> {
    const roles = await this.rolesRepository.find({
      order: {
        roleId: 'ASC',
      },
    });
    return plainToInstance(RoleDto, roles, { excludeExtraneousValues: true });
  }

  async findRole(roleId: number): Promise<any> {
    const existingRole = await this.rolesRepository.findOneBy({
      roleId,
      active: STATUS_ACTIVE,
    });
    if (!existingRole)
      throw new HttpException(
        {
          status: 'error',
          message: 'No se encuentra el rol.',
          roleId: roleId,
        },
        HttpStatus.CONFLICT,
      );

    const roleDto = new RoleDto();
    roleDto.name = existingRole.name;
    roleDto.description = existingRole.description;
    roleDto.active = existingRole.active;
    return roleDto;
  }

  async updateRole(
    roleId: number,
    name: string,
    description: string,
  ): Promise<any> {
    const existingRole = await this.rolesRepository.findOneBy({
      roleId,
      active: STATUS_ACTIVE,
    });
    if (!existingRole)
      throw new HttpException(
        {
          status: 'error',
          message: 'No se encuentra el rol.',
          roleId: roleId,
        },
        HttpStatus.CONFLICT,
      );

    const existingRoleName = await this.rolesRepository.findOneBy({
      name: name,
    });
    if (existingRoleName && existingRole.name !== existingRoleName.name)
      throw new HttpException(
        {
          status: 'error',
          message: 'El nombre de rol ya existe.',
          role: name,
        },
        HttpStatus.CONFLICT,
      );

    existingRole.name = name;
    existingRole.description = description;

    const result = await this.rolesRepository.update(
      { roleId: existingRole.roleId },
      existingRole,
    );

    return { update: result.affected > 0 };
  }

  async removeOrEnableRole(roleId: number, activate: boolean): Promise<any> {
    const existingRole = await this.rolesRepository.findOneBy({
      roleId,
      active: activate ? STATUS_INACTIVE : STATUS_ACTIVE,
    });
    if (!existingRole)
      throw new HttpException(
        {
          status: 'error',
          message: 'No se encuentra el rol.',
          roleId: roleId,
        },
        HttpStatus.CONFLICT,
      );

    existingRole.active = activate ? STATUS_ACTIVE : STATUS_INACTIVE;

    const result = await this.rolesRepository.update(
      { roleId: existingRole.roleId },
      existingRole,
    );

    return { update: result.affected > 0 };
  }
}
