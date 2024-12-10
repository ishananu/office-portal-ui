import * as React from 'react';
import { Outlet } from 'react-router-dom';
type Props = {
  view: 'LOGIN' | 'SIGNUP';
};

export const PublicLayout = (props: Props) => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex text-center justify-center items-center">
          <img
            alt="Office Portal"
            src="/assets/office-portal-logo.png"
            className="h-10 w-auto"
          />
          <p className="text-center text-3xl font-bold tracking-tight text-gray-500 ml-2">
            OFFICE PORTAL
          </p>
        </div>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          {props.view === 'LOGIN'
            ? 'Sign in to your account'
            : 'Sign up to your new account'}
        </h2>
      </div>
      <Outlet />
    </div>
  );
};
