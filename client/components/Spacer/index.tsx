import React from 'react';
import { View } from 'react-native';

interface SpacerWidthProps {
  width: number;
}
interface SpacerHeightProps {
  height: number;
}

export function Spacer(
  props: SpacerWidthProps | SpacerHeightProps
): React.ReactElement {
  return (
    <View
      style={{
        height: 'width' in props ? '100%' : props.height,
        width: 'height' in props ? '100%' : props.width
      }}
    />
  );
}

export default Spacer;
