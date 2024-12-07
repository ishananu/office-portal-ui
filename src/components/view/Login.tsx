import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthLoading } from '../../app/features/auth/authSelectors';
import { loginUser } from '../../app/features/auth/authThunks';
import { AppDispatch, RootState } from '../../app/store/redux-store';
import { useNavigate } from 'react-router-dom';

type Props = {};

interface IFormErrors {
  email?: string;
  password?: string;
}

export const Login: React.FC<Props> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<IFormErrors>({});
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector((state: RootState) => selectAuthLoading(state));
  const navigate = useNavigate();

  const validateForm = useCallback(() => {
    const errors: IFormErrors = {};
    if (!email) errors.email = 'Email is required.';
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
      errors.email = 'Invalid email format.';
    if (!password) errors.password = 'Password is required.';
    else if (password.length < 6)
      errors.password = 'Password must be at least 6 characters.';
    return errors;
  }, [email, password]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const validationErrors: IFormErrors = validateForm();
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length > 0) return;
      await dispatch(loginUser({ email, password }) as any);
      navigate('/dashboard');
    },
    [email, password, dispatch, navigate]
  );

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
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                  errors.email ? 'ring-red-500' : 'ring-gray-300'
                } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="/"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                  errors.password ? 'ring-red-500' : 'ring-gray-300'
                } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`flex w-full justify-center rounded-md ${
                isLoading ? 'bg-indigo-400' : 'bg-indigo-600'
              } px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg
                    className="w-5 h-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  <span>Loading...</span>
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Not a member?{' '}
          <a
            href="/"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Create a account
          </a>
        </p>
      </div>
    </div>
  );
};
