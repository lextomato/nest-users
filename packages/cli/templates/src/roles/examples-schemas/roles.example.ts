import { RoleDto } from '../dto/response-role.dto';

export const rolesArrayExample: RoleDto[] = [
  {
    roleId: 1,
    name: 'usuario',
    description: 'Usuario comun',
    active: true,
  },
  {
    roleId: 2,
    name: 'admin',
    description: 'Administrador de sitema',
    active: true,
  },
];
