import * as React from 'react';
import {
  GetDashboardRoute,
  GetEmployeesRoute,
  GetLibraryRoute,
  GetProductsRoute
} from '../../routes/user/router';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DisclosureButton } from '@headlessui/react';
import { useTranslation } from 'react-i18next';

type Props = {
  type: 'MAIN' | 'MOBILE';
};

const classNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(' ');
};

export const MainNavigation = (props: Props) => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const [t] = useTranslation();

  const navigation: { name: string; href: string }[] = React.useMemo(
    () => [
      { name: t('navigation.dashboard'), href: GetDashboardRoute() },
      { name: t('navigation.employees'), href: GetEmployeesRoute() },
      { name: t('navigation.library'), href: GetLibraryRoute() },
      { name: t('navigation.products'), href: GetProductsRoute() }
    ],
    [t]
  );

  return (
    <>
      {navigation.map((item) => {
        return props.type === 'MAIN' ? (
          <Link
            key={item.name}
            to={item.href}
            aria-current={pathname === item.href ? 'page' : undefined}
            className={classNames(
              pathname === item.href
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'rounded-md px-3 py-2 text-sm font-medium'
            )}
          >
            {item.name}
          </Link>
        ) : (
          <DisclosureButton
            key={item.name}
            onClick={() => navigate(item.href)}
            aria-current={pathname === item.href ? 'page' : undefined}
            className={classNames(
              pathname === item.href
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'block rounded-md px-3 py-2 text-base font-medium'
            )}
          >
            {item.name}
          </DisclosureButton>
        );
      })}
    </>
  );
};
