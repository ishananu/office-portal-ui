import { Local } from './local';

export const En: Local = {
  language: 'en',
  app: {
    navigation: {
      dashboard: 'Dashboard',
      employees: 'Employees',
      library: 'Library',
      products: 'Products'
    },
    employees: {
      table: {
        name: 'Name',
        email: 'Email',
        createdAt: 'Created At'
      },
      action: {
        edit: 'Edit',
        delete: 'Delete',
        save: 'Save',
        cancel: 'Cancel',
        addEmployee: 'Add Employee'
      }
    }
  }
};
