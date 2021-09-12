import React, { FC } from 'react';
import { Text } from '@components/Text';
import { colors } from '@constants/colors';

export const Label: FC = ({ children }) => (
  <Text weight="bold" size={18} color={colors.neutral[1000]}>
    {children}
  </Text>
);
