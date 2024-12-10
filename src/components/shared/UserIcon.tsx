import * as React from 'react';

type Props = {
  img: string;
  className?: string;
  propic?: boolean;
};

export const UserIcon: React.FC<Props> = ({
  img,
  className = 'size-8 rounded-full',
  propic = true
}) => {
  return (
    <div>
      {img ? (
        <img src={`/assets/${img}.png`} className={className} />
      ) : (
        <div
          className={`relative  overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${
            propic ? 'size-8' : 'size-10'
          }`}
        >
          <svg
            className={`absolute  text-gray-400 -left-1 ${
              propic ? 'size-10' : 'w-12 h-12'
            }`}
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
      )}
    </div>
  );
};
