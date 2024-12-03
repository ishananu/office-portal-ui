import { createBrowserRouter, redirect } from 'react-router-dom';
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

const checkAuth = (): boolean => {
  // const token = document.cookie.split("; ").find(row => row.startsWith("authToken="));
  // return Boolean(token);
  return false;
};

const rootLoader = () => {
  if (checkAuth()) {
    throw redirect('/dashboard');
  }
  return null;
};

const protectedLoader = () => {
  if (!checkAuth()) {
    throw redirect('/');
  }
  return null;
};

const routerPaths = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <ErrorPage />,
    loader: rootLoader
  },
  {
    path: GetDashboardRoute(),
    element: <DashboardLayout />,
    children: [{ path: '', element: <Dashboard /> }],
    loader: protectedLoader
  },
  {
    path: GetDashboardRoute(),
    element: <DashboardLayout />,
    children: [{ path: '', element: <Dashboard /> }],
    loader: protectedLoader
  },
  {
    path: GetEmployeesRoute(),
    element: <DashboardLayout />,
    children: [{ path: '', element: <Employees /> }],
    loader: protectedLoader
  },
  {
    path: GetLibraryRoute(),
    element: <DashboardLayout />,
    children: [{ path: '', element: <Library /> }],
    loader: protectedLoader
  },
  {
    path: GetProductsRoute(),
    element: <DashboardLayout />,
    children: [{ path: '', element: <Products /> }],
    loader: protectedLoader
  }
]);

export { routerPaths };
