import routes from './const';

const GetDashboardRoute = () => {
  return routes.dashboard;
};

const GetEmployeesRoute = () => {
  return routes.employees;
};

const GetLibraryRoute = () => {
  return routes.library;
};

const GetProductsRoute = () => {
  return routes.products;
};

const GetSignupRoute = () => {
  return routes.signup;
};

export {
  GetDashboardRoute,
  GetEmployeesRoute,
  GetLibraryRoute,
  GetProductsRoute,
  GetSignupRoute
};
