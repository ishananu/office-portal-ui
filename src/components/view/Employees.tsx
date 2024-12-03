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
import { addToast } from '../../app/features/toast/toastSlice';

export const Employees = () => {
  const dispatch: AppDispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.list);

  const [currentPage, currentPagecurrentPage] = useState<number>(1);
  const [editingUserId, setEditingUserId] = useState<string>('');
  const [editValues, setEditValues] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (): void => {
    setModalOpen(true);
    dispatch(
      addToast({
        type: 'success',
        message: 'Operation was successful!',
        duration: 3000
      })
    );
  };
  const handleCloseModal = (): void => setModalOpen(false);

  const handleSaveUser = (userData: Partial<IUser>): void => {
    dispatch(postUser(userData));
  };

  const handleEditClick = (user: IUser) => {
    setEditingUserId(user._id);
    setEditValues({ name: user.name, email: user.email });
  };

  const handleDeleteClick = (user: IUser) => {
    setEditingUserId(user._id);
    setIsDeleteModalOpen(true);
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
      dispatch(deletetUser(editingUserId)); // Call your Redux action or API
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
      <div className="flex justify-end mb-2">
        <button
          onClick={handleOpenModal}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
        >
          Add Employee
        </button>

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
      </div>
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
            {users.map((person, i) => (
              <tr className="hover:bg-slate-50" key={`p-${person.email}`}>
                <td className="p-4 border-b border-slate-200 flex">
                  <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
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
    </MainContent>
  );
};
