import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesEntity } from 'src/common/entities/roles.entity';
import { PermissionsModule } from 'src/permissions/permissions.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    PermissionsModule,
    UsersModule,
    TypeOrmModule.forFeature([RolesEntity]),
  ],
  providers: [RolesService],
  controllers: [RolesController],
})
export class RolesModule {}
