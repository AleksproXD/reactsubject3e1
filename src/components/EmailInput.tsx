import React, { useState } from 'react';
import { View, TextInput, Text, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { emailSchema } from '../schemas/emailSchema';
import { MESSAGES, VALIDATION_COLORS } from '../constants/messages';

interface EmailInputProps {
  onValidEmail?: (email: string) => void;
}

export const EmailInput: React.FC<EmailInputProps> = ({ onValidEmail }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Validación en tiempo real
  const validateEmail = (value: string) => {
    setEmail(value);
    
    if (value.length === 0) {
      setError(null);
      setIsValid(false);
      return;
    }

    try {
      emailSchema.parse({ email: value });
      setError(null);
      setIsValid(true);
    } catch (err: any) {
      setIsValid(false);
      if (err.errors && err.errors[0]) {
        setError(err.errors[0].message);
      }
    }
  };

  // Animación del borde del input
  const borderStyle = useAnimatedStyle(() => {
    let borderColor = VALIDATION_COLORS.default;
    
    if (isFocused) {
      borderColor = VALIDATION_COLORS.focus;
    } else if (error) {
      borderColor = VALIDATION_COLORS.error;
    } else if (isValid) {
      borderColor = VALIDATION_COLORS.success;
    }

    return {
      borderColor: withTiming(borderColor, { duration: 300 }),
      borderWidth: 2,
    };
  });

  // Animación del mensaje de feedback
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

  const handleValidate = () => {
    if (isValid && onValidEmail) {
      onValidEmail(email);
    }
  };

  return (
    <View className="w-full px-6">
      {/* Label */}
      <Text className="text-gray-700 text-base font-semibold mb-2">
        {MESSAGES.labels.emailInput}
      </Text>

      {/* Input Container con Animación */}
      <Animated.View 
        style={borderStyle}
        className="bg-white rounded-xl overflow-hidden"
      >
        <TextInput
          value={email}
          onChangeText={validateEmail}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={MESSAGES.placeholders.email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          className="px-4 py-4 text-base text-gray-800"
        />
      </Animated.View>

      {/* Feedback Messages con Animación */}
      <Animated.View style={feedbackStyle} className="mt-2 min-h-[24px]">
        {error && (
          <Text className="text-red-500 text-sm font-medium">
            ⚠️ {error}
          </Text>
        )}
        {isValid && !error && (
          <Text className="text-green-500 text-sm font-medium">
            {MESSAGES.validation.emailValid}
          </Text>
        )}
      </Animated.View>

      {/* Botón de Validación */}
      <Pressable
        onPress={handleValidate}
        disabled={!isValid}
        className={`mt-6 py-4 rounded-xl ${
          isValid 
            ? 'bg-blue-500 active:bg-blue-600' 
            : 'bg-gray-300'
        }`}
      >
        <Text 
          className={`text-center text-base font-bold ${
            isValid ? 'text-white' : 'text-gray-500'
          }`}
        >
          {MESSAGES.labels.validateButton}
        </Text>
      </Pressable>
    </View>
  );
};