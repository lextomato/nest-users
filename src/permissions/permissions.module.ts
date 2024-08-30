import { forwardRef, Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesEntity } from 'src/common/entities/roles.entity';
import { RolePermissionsEntity } from 'src/common/entities/role-permissions.entity';
import { PermissionsEntity } from 'src/common/entities/permissions.entity';
import { RolePermissionsController } from './role-permissions.controller';
import { DiscoveryModule } from '@nestjs/core';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    DiscoveryModule,
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([
      RolesEntity,
      RolePermissionsEntity,
      PermissionsEntity,
    ]),
  ],
  providers: [PermissionsService],
  controllers: [PermissionsController, RolePermissionsController],
  exports: [PermissionsService],
})
export class PermissionsModule {}
