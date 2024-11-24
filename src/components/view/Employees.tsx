import * as React from 'react';
import { MainContent } from '../layout/MainContent';
import { AppDispatch, RootState } from '../../app/store/redux-store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../app/features/users/userThunk';

export const Employees = () => {
  const dispatch: AppDispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.list);

  const [currentPage, currentPagecurrentPage] = React.useState<number>(1);

  React.useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers(currentPage));
    }
  }, [dispatch]);

  return (
    <MainContent title="Employees">
      <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-normal leading-none text-slate-500">
                  Name
                </p>
              </th>
              <th className="p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-normal leading-none text-slate-500">
                  Email
                </p>
              </th>
              <th className="p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-normal leading-none text-slate-500">
                  Created at
                </p>
              </th>
              <th className="p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-normal leading-none text-slate-500"></p>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((person) => (
              <tr className="hover:bg-slate-50 " key={`p-${person.email}`}>
                <td className="p-4 border-b border-slate-200 flex">
                  <img
                    className="size-10 rounded-full"
                    src={
                      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                    }
                    alt=""
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {person.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {(person as any)._id}
                    </p>
                  </div>
                </td>

                <td className="p-4 border-b border-slate-200">
                  <p className="block text-sm text-slate-800">{person.email}</p>
                </td>
                <td className="p-4 border-b border-slate-200">
                  <p className="block text-sm text-slate-800">23/04/18</p>
                </td>
                <td className="p-4 border-b border-slate-200">
                  <a
                    href="#"
                    className="block text-sm font-semibold text-slate-800 mr-2"
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="block text-sm font-semibold text-slate-800"
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainContent>
  );
};
