import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/common/entities/users.entity';
import { RolesEntity } from 'src/common/entities/roles.entity';
import { PermissionsModule } from 'src/permissions/permissions.module';

@Module({
  imports: [
    forwardRef(() => PermissionsModule),
    TypeOrmModule.forFeature([UsersEntity, RolesEntity]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
