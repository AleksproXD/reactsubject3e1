import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { nameSchema } from '../schemas/authSchema';
import { AUTH_MESSAGES, AUTH_COLORS } from '../constants/authMessages';

interface NameInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onValidationChange?: (isValid: boolean) => void;
}

export const NameInput: React.FC<NameInputProps> = ({
  value,
  onChangeText,
  onValidationChange,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const validateName = (text: string) => {
    onChangeText(text);

    if (text.length === 0) {
      setError(null);
      setIsValid(false);
      onValidationChange?.(false);
      return;
    }

    try {
      nameSchema.parse(text);
      setError(null);
      setIsValid(true);
      onValidationChange?.(true);
    } catch (err: any) {
      setIsValid(false);
      onValidationChange?.(false);
      if (err.errors && err.errors[0]) {
        setError(err.errors[0].message);
      }
    }
  };

  const borderStyle = useAnimatedStyle(() => {
    let borderColor = AUTH_COLORS.default;

    if (isFocused) {
      borderColor = AUTH_COLORS.focus;
    } else if (error) {
      borderColor = AUTH_COLORS.error;
    } else if (isValid) {
      borderColor = AUTH_COLORS.success;
    }

    return {
      borderColor: withTiming(borderColor, { duration: 300 }),
      borderWidth: 2,
    };
  });

  const feedbackStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(error || isValid ? 1 : 0, { duration: 300 }),
      transform: [
        {
          translateY: withSpring(error || isValid ? 0 : -10, {
            damping: 15,
            stiffness: 150,
          }),
        },
      ],
    };
  });

  return (
    <View className="w-full mb-4">
      <Text className="text-gray-700 text-sm font-semibold mb-2">
        {AUTH_MESSAGES.labels.name}
      </Text>

      <Animated.View style={borderStyle} className="bg-white rounded-xl">
        <TextInput
          value={value}
          onChangeText={validateName}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={AUTH_MESSAGES.placeholders.name}
          autoCapitalize="words"
          autoComplete="name"
          className="px-4 py-3 text-base text-gray-800"
        />
      </Animated.View>

      <Animated.View style={feedbackStyle} className="mt-1 min-h-[20px]">
        {error && (
          <Text className="text-red-500 text-xs font-medium">⚠️ {error}</Text>
        )}
        {isValid && !error && (
          <Text className="text-green-500 text-xs font-medium">
            {AUTH_MESSAGES.nameValidation.valid}
          </Text>
        )}
      </Animated.View>
    </View>
  );
};