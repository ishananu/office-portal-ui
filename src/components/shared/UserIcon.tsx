import * as React from 'react';

type Props = {
  img: string;
  className?: string;
};

export const UserIcon: React.FC<Props> = ({
  img,
  className = 'size-8 rounded-full'
}) => {
  return (
    <div>
      {img ? (
        <img src={`/assets/${img}.png`} className={className} />
      ) : (
        <svg
          className="absolute size-8 rounded-full text-gray-400 -left-1"
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
  );
};
