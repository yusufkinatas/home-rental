import { colors } from '@constants/colors';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  Pressable
} from 'react-native';
import { Control, Path, RegisterOptions, useController } from 'react-hook-form';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { Text } from '@components/Text';
import { Icon } from '@components/Icon';

const animationConfig: Animated.WithTimingConfig = {
  duration: 200,
  easing: Easing.linear
};

interface InputProps<T> extends TextInputProps {
  control: Control<T>;
  name: Path<T>;
  rules?: Exclude<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >;
  label: string;
}

export const Input = <T extends {}>(props: InputProps<T>) => {
  const {
    control,
    name,
    rules,
    label,
    style,
    secureTextEntry,
    placeholder,
    multiline,
    ...rest
  } = props;
  const inputRef = useRef<TextInput>(null);
  const labelAnimation = useSharedValue(0);

  const [isSecureText, setIsSecureText] = useState(secureTextEntry);
  const toggleSecureTextEntry = () => setIsSecureText((v) => !v);

  const {
    field,
    fieldState: { error }
  } = useController({ control, name, rules });

  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (field.value || focused) {
      labelAnimation.value = 1;
    } else {
      labelAnimation.value = 0;
    }
  }, [focused, field.value]);

  const [labelWidth, setLabelWidth] = useState(100);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(
            interpolate(labelAnimation.value, [0, 1], [0, -20]),
            animationConfig
          )
        },
        {
          translateX: withTiming(
            interpolate(labelAnimation.value, [0, 1], [0, labelWidth * -0.1]),
            animationConfig
          )
        },
        {
          scale: withTiming(
            interpolate(labelAnimation.value, [0, 1], [1, 0.8]),
            animationConfig
          )
        }
      ]
    };
  }, [labelWidth]);

  return (
    <View
      style={[styles.container, multiline && styles.containerMultiline, style]}
    >
      <Animated.Text
        onLayout={(e) => setLabelWidth(e.nativeEvent.layout.width)}
        style={[animatedStyle, styles.label]}
      >
        {label}
      </Animated.Text>
      <TextInput
        ref={inputRef}
        value={field.value as string}
        onChangeText={field.onChange}
        style={styles.input}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        secureTextEntry={isSecureText}
        placeholder=""
        multiline={multiline}
        {...rest}
      />
      {!!error?.message && (
        <Text size={14} color={colors.danger} style={styles.error}>
          {error.message}
        </Text>
      )}
      {'secureTextEntry' in props && (
        <Pressable style={styles.eyeContainer} onPress={toggleSecureTextEntry}>
          {isSecureText ? <Icon name="eye" /> : <Icon name="eye-slash" />}
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: 40,
    marginBottom: 32,
    borderBottomWidth: 1,
    borderColor: colors.neutral[600]
  },
  containerMultiline: {
    minHeight: 40,
    height: undefined,
    maxHeight: 96,
    paddingTop: 8
  },
  label: {
    position: 'absolute',
    top: 9,
    fontFamily: 'Lato',
    fontSize: 16,
    color: colors.neutral[500]
  },
  input: {
    fontSize: 16,
    fontWeight: 'normal',
    fontFamily: 'Lato',
    color: colors.neutral[600],
    width: '100%',
    height: '100%'
  },
  error: { position: 'absolute', left: 0, bottom: -24 },
  eyeContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
