export const microservicesEndpoints = {
  wriststone: 'wriststone'
}

export const apiEndPoints = {
  auth: {
    authorize: 'authorize',
    register: 'register',
  },
  permissions: {
    getDefaultPermissions: 'getDefaultPermissions',
    getPermissions: 'getPermissions',
  },
  users: {
    getUser: 'getUser',
    editUser: 'editUser',
  },
  usersManagement: {
    getAllUsers: 'getAllUsers',
    getAllUserRoles: 'getAllUserRoles',
    getManagementUser: 'getManagementUser',
    addManagementUser: 'addManagementUser',
    updateManagementUser: 'updateManagementUser',
    removeManagementUser: 'removeManagementUser',
  }
}
