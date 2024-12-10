import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthLoading } from '../../app/features/auth/authSelectors';
import { loginUser, resgiterUser } from '../../app/features/auth/authThunks';
import { AppDispatch, RootState } from '../../app/store/redux-store';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { GetSignupRoute } from '../../routes/user/router';
import UserIconHolder from '../shared/UserIconHolder';

type Props = {
  view: 'LOGIN' | 'SIGNUP';
};

interface IFormErrors {
  email?: string;
  password?: string;
  name?: string;
}

const LoadingSVG = () => {
  return (
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
  );
};

export const UserForm: React.FC<Props> = (props: Props) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [img, setUserImg] = useState('');
  const [errors, setErrors] = useState<IFormErrors>({});
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector((state: RootState) => selectAuthLoading(state));
  const navigate = useNavigate();

  const validateForm = useCallback(() => {
    const errors: IFormErrors = {};
    if (props.view === 'SIGNUP') {
      if (!name) errors.name = 'Name is required.';
    }
    if (!email) errors.email = 'Email is required.';
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
      errors.email = 'Invalid email format.';
    if (!password) errors.password = 'Password is required.';
    else if (password.length < 6)
      errors.password = 'Password must be at least 6 characters.';
    return errors;
  }, [email, password, name]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const validationErrors: IFormErrors = validateForm();
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length > 0) return;
      if (props.view === 'LOGIN') {
        await dispatch(loginUser({ email, password }) as any);
        navigate('/dashboard', { state: { refresh: false } });
      } else {
        const response = await dispatch(
          resgiterUser({ name, email, password, img }) as any
        );
        if (!response?.error) {
          navigate('/');
        }
      }
    },
    [name, email, password, dispatch, navigate]
  );

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        {props.view === 'SIGNUP' && (
          <div>
            <label
              htmlFor="name"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                  errors.name ? 'ring-red-500' : 'ring-gray-300'
                } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
          </div>
        )}

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
            {props.view === 'LOGIN' && (
              <div className="text-sm">
                <div className="relative group inline-block">
                  <div className="absolute bottom-full transform  mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    This feature is disabled.
                  </div>
                  <p className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-not-allowed">
                    Forgot password?
                  </p>
                </div>
              </div>
            )}
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
        {props.view === 'SIGNUP' && (
          <>
            <label
              htmlFor="chooseicon"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Choose Icon
            </label>
            <UserIconHolder onSelect={setUserImg} />
          </>
        )}

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`flex w-full justify-center rounded-md ${
              isLoading ? 'bg-indigo-400' : 'bg-indigo-600'
            } px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
          >
            {isLoading ? (
              <LoadingSVG />
            ) : (
              <span>{props.view === 'SIGNUP' ? 'Sign up' : 'Sign in'}</span>
            )}
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm/6 text-gray-500">
        {props.view === 'LOGIN'
          ? ' Not a member?'
          : 'Already have an account? '}{' '}
        <Link
          to={props.view === 'SIGNUP' ? '/' : GetSignupRoute()}
          className="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          {props.view === 'LOGIN' ? 'Create a account' : 'Login to my account'}
        </Link>
      </p>
    </div>
  );
};
