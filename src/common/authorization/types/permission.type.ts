export type PermissionDef = {
  /**
   * @param {string} action - Unique action name, e.g. `resourcer.action`
   */
  action: string;
  /**
   * @param {string} description - Description, e.g. `can action resourcer`
   */
  description: string;
};
