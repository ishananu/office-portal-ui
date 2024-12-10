import React, { useState, useEffect } from 'react';
import { MainContent } from '../layout/MainContent';
import { AppDispatch, RootState } from '../../app/store/redux-store';
import { useDispatch, useSelector } from 'react-redux';
import {
  deletetUser,
  editUser,
  fetchUsers,
  postUser
} from '../../app/features/users/userThunk';
import { IUser } from '../../app/type';
import AddUserModal from '../shared/AddEmployee';
import ActionModal from '../shared/ActionModal';
import ActionButtons from '../shared/ActionButtons';
import TablePagination from '../shared/TablePagination';
import { DEFAULT_ROW_COUNT } from '../../config/const';
import { setUserTotal } from '../../app/features/users/userSlice';
import { useTranslation } from 'react-i18next';
import { UserIcon } from '../shared/UserIcon';

const formatDate = (dateString: string): string | undefined => {
  if (!dateString) return;
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(date);
};

export const Employees = () => {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.list);
  const usersTotal = useSelector((state: RootState) => state.users.total);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [editingUserId, setEditingUserId] = useState<string>('');
  const [editValues, setEditValues] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [t] = useTranslation();

  const handleOpenModal = (): void => {
    setModalOpen(true);
  };
  const handleCloseModal = (): void => setModalOpen(false);

  const handleSaveUser = async (userData: Partial<IUser>): Promise<void> => {
    await dispatch(postUser(userData));
    dispatch(setUserTotal(usersTotal + 1));
    setModalOpen(false);
  };

  const handleEditClick = (user: IUser) => {
    setEditingUserId(user._id);
    setEditValues({ name: user.name, email: user.email });
  };

  const handleDeleteClick = (user: IUser) => {
    setEditingUserId(user._id);
    setIsDeleteModalOpen(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (page > Math.ceil(users.length / DEFAULT_ROW_COUNT)) {
      dispatch(fetchUsers(page));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditValues({ ...editValues, [name]: value });

    const newErrors: { name?: string; email?: string } = {};
    if (name === 'name' && value.trim() === '') {
      newErrors.name = 'Name is required.';
    }
    if (name === 'email') {
      if (value.trim() === '') {
        newErrors.email = 'Email is required.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        newErrors.email = 'Invalid email format.';
      }
    }
    setErrors(newErrors);
  };

  const handleSaveClick = (userId: string) => {
    dispatch(editUser({ ...editValues, _id: editingUserId }));
    setEditingUserId('');
  };

  const handleCancelClick = () => {
    setEditingUserId('');
  };

  const handleModalClose = () => {
    setIsDeleteModalOpen(false);
    setEditingUserId('');
  };

  const handleConfirmDelete = () => {
    if (editingUserId) {
      dispatch(deletetUser(editingUserId));
      dispatch(setUserTotal(usersTotal - 1));
    }
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers(currentPage));
    }
  }, [dispatch]);

  return (
    <MainContent title={t('navigation.employees')}>
      <AddUserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveUser}
      />

      <ActionModal
        isOpen={isDeleteModalOpen}
        errorType="delete"
        message="Are you sure you want to delete this? This action cannot be undone."
        showActions={true}
        onConfirm={handleConfirmDelete}
        onCancel={handleModalClose}
        onClose={handleModalClose}
      />

      <div className="flex justify-between">
        <div className="pb-4 bg-white ">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Search for employees"
            />
          </div>
        </div>
        <button
          onClick={handleOpenModal}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm mb-4"
        >
          {t('employees.action.addEmployee')}
        </button>
      </div>

      <div className="relative flex flex-col w-full h-full overflow-auto text-gray-700 bg-white shadow-md  bg-clip-border">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-normal leading-none text-slate-500">
                  {t('employees.table.name')}
                </p>
              </th>
              <th className="p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-normal leading-none text-slate-500">
                  {t('employees.table.email')}
                </p>
              </th>
              <th className="p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-normal leading-none text-slate-500">
                  {t('employees.table.createdAt')}
                </p>
              </th>
              <th className="p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-normal leading-none text-slate-500"></p>
              </th>
            </tr>
          </thead>
          <tbody>
            {users
              .slice(
                (currentPage - 1) * DEFAULT_ROW_COUNT,
                DEFAULT_ROW_COUNT * currentPage
              )
              .map((person, i) => (
                <tr className="hover:bg-slate-50" key={`p-${person.email}`}>
                  <td className="p-4 border-b border-slate-200 flex">
                    <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                      <UserIcon
                        img={person.img!}
                        className="w-full h-full object-cover rounded-lg"
                        propic={false}
                      />
                    </div>

                    <div className="ml-3">
                      {editingUserId === person._id ? (
                        <>
                          <input
                            type="text"
                            name="name"
                            value={editValues.name}
                            onChange={handleInputChange}
                            className="text-sm font-medium text-gray-900"
                          />
                          {errors.name && (
                            <p className="text-xs text-red-500">
                              {errors.name}
                            </p>
                          )}
                        </>
                      ) : (
                        <>
                          <p className="text-sm font-medium text-gray-900">
                            {person.name}
                          </p>
                        </>
                      )}
                      <p className="text-sm text-gray-500">
                        {(person as any)._id}
                      </p>
                    </div>
                  </td>

                  <td className="p-4 border-b border-slate-200">
                    {editingUserId === person._id ? (
                      <>
                        <input
                          type="email"
                          name="email"
                          value={editValues.email}
                          onChange={handleInputChange}
                          className="text-sm text-gray-500"
                        />
                        {errors.email && (
                          <p className="text-xs text-red-500">{errors.email}</p>
                        )}
                      </>
                    ) : (
                      <>
                        <p className="block text-sm text-slate-800">
                          {person.email}
                        </p>
                      </>
                    )}
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <p className="block text-sm text-slate-800">
                      {formatDate(person.createdAt!)}
                    </p>
                  </td>

                  <td className="p-4 border-b border-slate-200">
                    <ActionButtons
                      person={person}
                      editingUserId={editingUserId}
                      errors={{
                        email: !!errors['email'],
                        name: !!errors['name']
                      }}
                      key={`person-${i}`}
                      handleSaveClick={() => handleSaveClick(person._id)}
                      handleCancelClick={handleCancelClick}
                      handleDeleteClick={() => handleDeleteClick(person)}
                      handleEditClick={() => handleEditClick(person)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <TablePagination
        totalPages={Math.ceil(usersTotal / DEFAULT_ROW_COUNT)}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        itemsPerPageText={`${currentPage * DEFAULT_ROW_COUNT - 9}-${
          currentPage * DEFAULT_ROW_COUNT > usersTotal
            ? usersTotal
            : currentPage * DEFAULT_ROW_COUNT
        }`}
        totalItems={usersTotal}
      />
    </MainContent>
  );
};
