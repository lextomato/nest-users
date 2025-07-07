export class ActionDto {
  action: string;
  path: string;
  method: string;
  permissionInUse: boolean;
}

export class ControllersActionsDto {
  controller: string;
  actions: ActionDto[];
}
