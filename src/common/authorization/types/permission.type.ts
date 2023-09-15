export type PermissionDef = {
  /**
   * @param {string} action - Unique action name, e.g. `resourcer.action`
   */
  action: string;
  /**
   * @param {string} description - Description of the action, e.g. `can create users`
   */
  description: string;
};

export type PermissionActionDef = {
  [key: string]: PermissionDef;
};

/**
 * @description e.g. { users: { create: ..., read: ..., ... }, other: {...}, ... }
 */
export type PermissionsListDef = {
  [resource: string]: PermissionActionDef;
};
