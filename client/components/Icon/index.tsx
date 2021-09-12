import React, { FC } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { IconProps } from '@expo/vector-icons/build/createIconSet';
import { colors } from '@constants/colors';

export const Icon: FC<
  IconProps<React.ComponentProps<typeof FontAwesome>['name']>
> = ({ size = 20, color = colors.neutral[600], ...rest }) => {
  return <FontAwesome size={size} color={color} {...rest} />;
};
