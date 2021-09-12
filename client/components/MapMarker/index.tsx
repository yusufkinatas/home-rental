import Spacer from '@components/Spacer';
import { Text } from '@components/Text';
import { colors } from '@constants/colors';
import { layout } from '@constants/layout';
import _ from 'lodash';
import React, { FC, memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { LatLng, Marker } from 'react-native-maps';

interface Props {
  onPress?: () => void;
  title: string;
  coordinate: LatLng;
  color?: string;
}

const _MapMarker: FC<Props> = ({
  coordinate,
  title,
  onPress,
  color = colors.primary
}) => {
  return (
    <Marker coordinate={coordinate} onPress={onPress}>
      <View style={[styles.titleContainer, { backgroundColor: color }]}>
        <Text
          weight="normal"
          color={colors.neutral[0]}
          size={12}
          numberOfLines={2}
          align="center"
        >
          {title}
        </Text>
      </View>
      <View style={[styles.triangle, { backgroundColor: color }]} />
      <Spacer height={2} />
    </Marker>
  );
};

export const MapMarker = memo(_MapMarker, (p, n) =>
  _.isEqualWith(_.omit(p, 'onPress'), _.omit(n, 'onPress'))
);

const styles = StyleSheet.create({
  titleContainer: {
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 4,
    maxWidth: layout.width * 0.5
  },
  triangle: {
    marginTop: -4,
    width: 8,
    height: 8,
    alignSelf: 'center',
    zIndex: -1,
    transform: [{ rotate: '45deg' }]
  }
});
