import { createBrowserRouter } from 'react-router-dom';
import { Login } from './components/view/Login';
import { Employees } from './components/view/Employees';
import ErrorPage from './components/view/Error';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Dashboard } from './components/view/Dashboard';
import {
  GetDashboardRoute,
  GetEmployeesRoute,
  GetLibraryRoute,
  GetProductsRoute
} from './routes/user/router';
import { Library } from './components/view/Library';
import { Products } from './components/view/Products';

const routerPaths = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: GetDashboardRoute(),
    element: <DashboardLayout />,
    children: [{ path: '', element: <Dashboard /> }]
  },
  {
    path: GetDashboardRoute(),
    element: <DashboardLayout />,
    children: [{ path: '', element: <Dashboard /> }]
  },
  {
    path: GetEmployeesRoute(),
    element: <DashboardLayout />,
    children: [{ path: '', element: <Employees /> }]
  },
  {
    path: GetLibraryRoute(),
    element: <DashboardLayout />,
    children: [{ path: '', element: <Library /> }]
  },
  {
    path: GetProductsRoute(),
    element: <DashboardLayout />,
    children: [{ path: '', element: <Products /> }]
  }
]);

export { routerPaths };
