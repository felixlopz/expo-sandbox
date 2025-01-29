import React, { useEffect, useRef, useState } from "react";
import { FieldError } from "react-hook-form";
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  Text,
  StyleProp,
  ViewStyle,
} from "react-native";

import { Animated } from "react-native";

const PLACEHOLDER_INITIAL_POSITION = 19;
const PLACEHOLDER_FINAL_POSITION = -9;

interface FloatingInputProps extends TextInputProps {
  placeholder?: string;
  value: string;
  error: FieldError | undefined;
  onChangeText: (text: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const FloatingInput: React.FC<FloatingInputProps> = ({
  placeholder,
  value,
  error,
  onChangeText,
  containerStyle,
  ...props
}) => {
  const [focus, setFocus] = useState(false);

  const floatingLabelAnimation = useRef(
    new Animated.Value(value ? 1 : 0)
  ).current;

  // Define animated styles for the floating label
  const floatingLabelStyle = {
    top: floatingLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [PLACEHOLDER_INITIAL_POSITION, PLACEHOLDER_FINAL_POSITION], // top value
    }),
    fontSize: floatingLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12], // font size
    }),
  };

  const translatePlaceholderToTop = () => {
    Animated.timing(floatingLabelAnimation, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const translatePlaceholderToDefault = () => {
    Animated.timing(floatingLabelAnimation, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const handleFocus = () => {
    translatePlaceholderToTop();
    setFocus(true);
  };

  const handleBlur = () => {
    if (value === "") {
      translatePlaceholderToDefault();
    }
    setFocus(false);
  };

  useEffect(() => {
    if (value != "") {
      translatePlaceholderToTop();
    }
  }, []);

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.View
        pointerEvents="none"
        style={[styles.placeholder, floatingLabelStyle]}
      >
        <Text
          style={[
            styles.palceholderText,
            focus && styles.focusPlaceholder,
            error && styles.errorPlaceholder,
          ]}
        >
          {placeholder}
        </Text>
      </Animated.View>
      <TextInput
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={[
          styles.input,
          focus && styles.focus,
          error && styles.inputError,
        ]}
        placeholder={""}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flexGrow: 1,
    flexShrink: 0,
  },
  placeholder: {
    position: "absolute",
    left: 21,
    zIndex: 2,
    paddingHorizontal: 2,
  },
  palceholderText: {
    color: "#e3e3e3",
    paddingHorizontal: 2,
  },
  input: {
    height: 56,
    paddingLeft: 23,
    paddingVertical: 20,
    backgroundColor: "#a7a7a7",
    borderRadius: 9999,
    borderColor: "#a7a7a7",
    borderWidth: 1,
  },
  focus: {
    borderColor: "#000",
  },
  focusPlaceholder: {
    color: "#000",
    backgroundColor: "#FFF",
  },
  errorPlaceholder: {
    color: "#FF0000",
    backgroundColor: "#FFF",
  },
  inputError: {
    borderColor: "#FF0000",
  },
  errorText: {
    color: "#FF0000",
    fontSize: 12,
    left: 12,
    bottom: -16,
    position: "absolute",
  },
});

export default FloatingInput;
