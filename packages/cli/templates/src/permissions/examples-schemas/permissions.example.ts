import { ControllersActionsDto } from '../dto/response-controllers-actions.dto';
import {
  PermissionDto,
  PermissionOfControllerDto,
} from '../dto/response-permission.dto';
import { RolePermissionsDto } from '../dto/response-role-permissions.dto';

export const permissionsArrayExample: PermissionDto[] = [
  {
    permissionId: 1,
    controller: 'UsersController',
    action: 'findAll',
    path: '/users',
    active: true,
  },
  {
    permissionId: 2,
    controller: 'UsersController',
    action: 'create',
    path: '/users',
    active: true,
  },
];

export const permissionsGroupByControllerArrayExample: PermissionOfControllerDto[] =
  [
    {
      controller: 'UsersController',
      actions: [
        {
          permissionId: 1,
          action: 'findAll',
          path: '/users',
          active: true,
          roles: [
            {
              roleId: 1,
              name: 'usuario',
              active: true,
            },
            {
              roleId: 2,
              name: 'admin',
              active: true,
            },
          ],
        },
        {
          permissionId: 2,
          action: 'update',
          path: '/users/{userUuid}',
          active: true,
          roles: [
            {
              roleId: 1,
              name: 'usuario',
              active: true,
            },
            {
              roleId: 2,
              name: 'admin',
              active: true,
            },
          ],
        },
      ],
    },
    {
      controller: 'RolesController',
      actions: [
        {
          permissionId: 19,
          action: 'create',
          path: '/roles',
          active: true,
          roles: [
            {
              roleId: 2,
              name: 'admin',
              active: true,
            },
          ],
        },
      ],
    },
  ];

export const rolePermissionsArrayExample: RolePermissionsDto[] = [
  {
    rolePermissionsId: 1,
    roleId: 2,
    permissionId: 1,
    createdAt: new Date('2024-08-26T23:41:35.713Z'),
    updatedAt: new Date('2024-08-26T23:41:35.713Z'),
    active: true,
    role: {
      roleId: 2,
      name: 'admin',
    },
    permission: {
      permissionId: 1,
      controller: 'UsersController',
      action: 'findAll',
    },
  },
  {
    rolePermissionsId: 3,
    roleId: 2,
    permissionId: 2,
    createdAt: new Date('2024-08-27T16:08:44.417Z'),
    updatedAt: new Date('2024-08-27T16:08:44.417Z'),
    active: true,
    role: {
      roleId: 2,
      name: 'admin',
    },
    permission: {
      permissionId: 2,
      controller: 'UsersController',
      action: 'findOne',
    },
  },
];

export const controllersActionsArrayExample: ControllersActionsDto[] = [
  {
    controller: 'AuthController',
    actions: [
      {
        action: 'checksession',
        path: '/auth/checksession',
        method: 'POST',
        permissionInUse: true,
      },
      {
        action: 'login',
        path: '/auth/login',
        method: 'POST',
        permissionInUse: false,
      },
      {
        action: 'logout',
        path: '/auth/logout',
        method: 'POST',
        permissionInUse: true,
      },
    ],
  },
  {
    controller: 'UsersController',
    actions: [
      {
        action: 'create',
        path: '/users',
        method: 'POST',
        permissionInUse: false,
      },
      {
        action: 'findAll',
        path: '/users',
        method: 'GET',
        permissionInUse: true,
      },
      {
        action: 'findOne',
        path: '/users/:userUuid',
        method: 'GET',
        permissionInUse: false,
      },
      {
        action: 'update',
        path: '/users/:userUuid',
        method: 'PUT',
        permissionInUse: false,
      },
    ],
  },
];
