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

export const Employees = () => {
  const dispatch: AppDispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.list);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [editingUserId, setEditingUserId] = useState<string>('');
  const [editValues, setEditValues] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (): void => {
    setModalOpen(true);
  };
  const handleCloseModal = (): void => setModalOpen(false);

  const handleSaveUser = async (userData: Partial<IUser>): Promise<void> => {
    await dispatch(postUser(userData));
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
    console.log('Page changed to:', page);
    setCurrentPage(page);
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

  const formatDate = (dateString: string) => {
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

  const handleModalClose = () => {
    setIsDeleteModalOpen(false);
    setEditingUserId('');
  };

  const handleConfirmDelete = () => {
    if (editingUserId) {
      dispatch(deletetUser(editingUserId));
    }
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers(currentPage));
    }
  }, [dispatch]);

  return (
    <MainContent title="Employees">
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Search for items"
            />
          </div>
        </div>
        <button
          onClick={handleOpenModal}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm mb-4"
        >
          Add Employee
        </button>
      </div>

      <div className="relative flex flex-col w-full h-full overflow-auto text-gray-700 bg-white shadow-md  bg-clip-border">
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
            {users.map((person, i) => (
              <tr className="hover:bg-slate-50" key={`p-${person.email}`}>
                <td className="p-4 border-b border-slate-200 flex">
                  <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    {person.img ? (
                      <img
                        src={`/assets/${person.img}.png`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <svg
                        className="absolute w-12 h-12 text-gray-400 -left-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    )}
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
                          <p className="text-xs text-red-500">{errors.name}</p>
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
        totalPages={5}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        itemsPerPageText={`${currentPage * 10 - 9}-${currentPage * 10}`}
        totalItems={100}
      />
    </MainContent>
  );
};
