import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  STATUS_ACTIVE,
  STATUS_INACTIVE,
} from 'src/common/constants/global-constants';
import { UsersEntity } from 'src/common/entities/users.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/response-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { plainToInstance } from 'class-transformer';
import { hashPassword } from 'src/common/utils/tools';
import { RolesEntity } from 'src/common/entities/roles.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    @InjectRepository(RolesEntity)
    private rolesRepository: Repository<RolesEntity>,
  ) {}

  async createUser(
    email: string,
    password: string,
    name: string,
    lastname: string,
  ): Promise<UserDto> {
    const existingUser = await this.usersRepository.findOneBy({
      email: email,
    });
    if (existingUser)
      throw new HttpException(
        {
          status: 'error',
          message: 'El email ya existe.',
          email: email,
        },
        HttpStatus.CONFLICT,
      );

    const hashedPassword = await hashPassword(password);
    const newUser = new UsersEntity();
    newUser.email = email;
    newUser.passwordHash = hashedPassword;
    newUser.userUuid = uuidv4();
    newUser.name = name;
    newUser.lastname = lastname;
    return this.usersRepository.save(newUser);
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.usersRepository.find({
      order: {
        userId: 'ASC',
      },
    });
    return plainToInstance(UserDto, users, { excludeExtraneousValues: true });
  }

  async findUser(userUuid: string): Promise<any> {
    const existingUser = await this.usersRepository.findOneBy({
      userUuid,
      active: STATUS_ACTIVE,
    });
    if (!existingUser)
      throw new HttpException(
        {
          status: 'error',
          message: 'No se encuentra usuario.',
          userUuid: userUuid,
        },
        HttpStatus.CONFLICT,
      );

    const userDto = new UserDto();
    userDto.userUuid = existingUser.userUuid;
    userDto.email = existingUser.email;
    userDto.name = existingUser.name;
    userDto.lastname = existingUser.lastname;
    userDto.active = existingUser.active;
    userDto.roleId = existingUser.roleId;
    return userDto;
  }

  async updateUser(
    userUuid: string,
    name: string,
    lastname: string,
  ): Promise<any> {
    const existingUser = await this.usersRepository.findOneBy({
      userUuid,
      active: STATUS_ACTIVE,
    });
    if (!existingUser)
      throw new HttpException(
        {
          status: 'error',
          message: 'No se encuentra usuario.',
          userUuid: userUuid,
        },
        HttpStatus.CONFLICT,
      );

    existingUser.name = name;
    existingUser.lastname = lastname;

    const result = await this.usersRepository.update(
      { userUuid: existingUser.userUuid },
      existingUser,
    );

    return { update: result.affected > 0 };
  }

  async updateUserRole(userUuid: string, roleId: number): Promise<any> {
    const existingUser = await this.usersRepository.findOneBy({
      userUuid,
      active: STATUS_ACTIVE,
    });
    if (!existingUser)
      throw new HttpException(
        {
          status: 'error',
          message: 'No se encuentra usuario.',
          userUuid: userUuid,
        },
        HttpStatus.CONFLICT,
      );

    existingUser.roleId = roleId;

    const result = await this.usersRepository
      .update({ userUuid: existingUser.userUuid }, existingUser)
      .catch((err) => {
        console.error(err);
        throw new HttpException(
          {
            status: 'error',
            message: 'Rol no existe.',
            property: 'roleId',
            valueProperty: roleId,
          },
          HttpStatus.BAD_REQUEST,
        );
      });

    return { update: result.affected > 0 };
  }

  async removeOrEnableUser(userUuid: string, activate: boolean): Promise<any> {
    const existingUser = await this.usersRepository.findOneBy({
      userUuid,
      active: activate ? STATUS_INACTIVE : STATUS_ACTIVE,
    });
    if (!existingUser)
      throw new HttpException(
        {
          status: 'error',
          message: 'No se encuentra usuario.',
          userUuid: userUuid,
        },
        HttpStatus.CONFLICT,
      );

    existingUser.active = activate ? STATUS_ACTIVE : STATUS_INACTIVE;

    const result = await this.usersRepository.update(
      { userUuid: existingUser.userUuid },
      existingUser,
    );

    return { update: result.affected > 0 };
  }

  async findUserWithRole(userUuid: string) {
    return this.usersRepository.findOne({
      where: { userUuid: userUuid },
      relations: ['role'],
    });
  }
}
