import React, { FC } from 'react';
import { FaSave, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import { IUser } from '../../app/type';
import { useTranslation } from 'react-i18next';

interface ActionButtonsProps {
  person: Partial<IUser>;
  editingUserId: string | null;
  errors: { name: boolean; email: boolean };
  handleSaveClick: (id: string) => void;
  handleCancelClick: () => void;
  handleEditClick: (person: Partial<IUser>) => void;
  handleDeleteClick: (person: Partial<IUser>) => void;
}

const ActionButtons: FC<ActionButtonsProps> = ({
  person,
  editingUserId,
  errors,
  handleSaveClick,
  handleCancelClick,
  handleEditClick,
  handleDeleteClick
}) => {
  const isEditing = editingUserId === person._id;
  const [t] = useTranslation();

  return (
    <div className="flex items-center space-x-4">
      {isEditing ? (
        <>
          {/* Save Button */}
          <button
            onClick={() => handleSaveClick(person._id!)}
            className={`flex items-center text-sm font-semibold ${
              errors.name || errors.email
                ? 'text-slate-500 cursor-not-allowed'
                : 'text-green-500 hover:text-green-600'
            }`}
            disabled={Boolean(errors.name || errors.email)}
          >
            <FaSave className="mr-1" /> {t('employees.action.save')}
          </button>

          {/* Cancel Button */}
          <button
            onClick={handleCancelClick}
            className="flex items-center text-sm font-semibold text-red-500 hover:text-red-600"
          >
            <FaTimes className="mr-1" /> {t('employees.action.cancel')}
          </button>
        </>
      ) : (
        <>
          {/* Edit Button */}
          <button
            onClick={() => handleEditClick(person)}
            className="flex items-center text-sm font-semibold text-blue-500 hover:text-blue-600"
          >
            <FaEdit className="mr-1" /> {t('employees.action.edit')}
          </button>

          {/* Delete Button */}
          <button
            onClick={() => handleDeleteClick(person)}
            className="flex items-center text-sm font-semibold text-red-500 hover:text-red-600"
          >
            <FaTrash className="mr-1" /> {t('employees.action.delete')}
          </button>
        </>
      )}
    </div>
  );
};

export default ActionButtons;
