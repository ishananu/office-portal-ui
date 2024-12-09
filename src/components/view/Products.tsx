import * as React from 'react';
import { MainContent } from '../layout/MainContent';
import { ComingSoon } from '../shared/ComingSoon';
import { useTranslation } from 'react-i18next';
type Props = {};

export const Products: React.FC = (props: Props) => {
  const [t] = useTranslation();
  return (
    <MainContent title={t('navigation.products')}>
      <ComingSoon />
    </MainContent>
  );
};
