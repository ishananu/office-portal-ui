export interface Local {
  language: string;
  app: {
    navigation: {
      dashboard: string;
      employees: string;
      products: string;
      library: string;
    };
    employees: {
      table: {
        name: string;
        email: string;
        createdAt: string;
      };
      action: {
        edit: string;
        delete: string;
        save: string;
        cancel: string;
        addEmployee: string;
      };
    };
  };
}
