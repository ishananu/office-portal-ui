interface IDashboardRoutes {
  dashboard: string;
  employees: string;
  library: string;
  products: string;
}

interface IPublicRoutes {
  signup: string;
}
const dashboardRoutes: IDashboardRoutes = {
  dashboard: '/dashboard',
  employees: '/employees',
  library: '/library',
  products: '/products'
};

const publicRoutes: IPublicRoutes = {
  signup: '/signup'
};

const routes = { ...dashboardRoutes, ...publicRoutes };

export default routes;
