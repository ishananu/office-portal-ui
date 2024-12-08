import * as React from 'react';
import { MainContent } from '../layout/MainContent';
import LanguageSwitcher from '../shared/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

type Props = {};

export const Dashboard = (props: Props) => {
  const [t] = useTranslation();
  return (
    <MainContent title="Dashboard">
      <section>
        <div className="mx-auto w-full max-w-7xl  py-16  md:py-10">
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:gap-6">
            {/* Features Item */}
            <div className="grid gap-6 rounded-md border border-solid border-gray-300 p-8 md:p-10">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPlaceholder%20Image.svg?alt=media&token=375a1ea3-a8b6-4d63-b975-aac8d0174074"
                alt=""
                className="inline-block h-16 w-16 object-cover rounded-full "
              />
              <h3 className="text-xl font-semibold">HElloo</h3>
              <p className="text-sm text-gray-500">
                {t('navigation.dashboard')} Lorem ipsum dolor sit amet
                consectetur adipiscing elit ut aliquam, purus sit.
              </p>

              <LanguageSwitcher />
            </div>
            {/* Features Item */}
            <div className="grid gap-6 rounded-md border border-solid border-gray-300 p-8 md:p-10">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPlaceholder%20Image.svg?alt=media&token=375a1ea3-a8b6-4d63-b975-aac8d0174074"
                alt=""
                className="inline-block h-16 w-16 object-cover rounded-full "
              />
              <h3 className="text-xl font-semibold">Products</h3>
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipiscing elit ut
                aliquam, purus sit.
              </p>
            </div>
            {/* Features Item */}
            <div className="grid gap-6 rounded-md border border-solid border-gray-300 p-8 md:p-10">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPlaceholder%20Image.svg?alt=media&token=375a1ea3-a8b6-4d63-b975-aac8d0174074"
                alt=""
                className="inline-block h-16 w-16 object-cover rounded-full "
              />
              <h3 className="text-xl font-semibold">Books</h3>
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipiscing elit ut
                aliquam, purus sit.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainContent>
  );
};
