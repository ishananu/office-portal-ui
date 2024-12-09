interface IDashboardRoutes {
  dashboard: string;
  employees: string;
  library: string;
  products: string;
}
const routes: IDashboardRoutes = {
  dashboard: '/dashboard',
  employees: '/employees',
  library: '/library',
  products: '/products'
};

export default routes;
