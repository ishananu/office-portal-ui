import { createBrowserRouter, redirect } from 'react-router-dom';
import { Login } from './components/view/Login';
import { Employees } from './components/view/Employees';
import { ErrorPage } from './components/view/Error';
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
import { isTokenValid } from './config/helpers';
import { getRefreshToken } from './app/features/auth/authThunks';
import { store } from './app/store/redux-store';

const checkAuth = async (): Promise<boolean> => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  if (isTokenValid(token)) {
    await store.dispatch(getRefreshToken() as any);
    return true;
  } else {
    return false;
  }
};

const rootLoader = async () => {
  if (await checkAuth()) {
    throw redirect('/dashboard');
  }
  return null;
};

const protectedLoader = async () => {
  if (!(await checkAuth())) {
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
