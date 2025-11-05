import React, { useState } from 'react';
import { View, TextInput, Text, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { passwordSchema, getPasswordStrength } from '../schemas/authSchema';
import { AUTH_MESSAGES, AUTH_COLORS } from '../constants/authMessages';

interface PasswordInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onValidationChange?: (isValid: boolean) => void;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChangeText,
  onValidationChange,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRequirements, setShowRequirements] = useState(false);

  const strengthInfo = value.length > 0 ? getPasswordStrength(value) : null;

  const validatePassword = (text: string) => {
    onChangeText(text);

    if (text.length === 0) {
      setError(null);
      setIsValid(false);
      setShowRequirements(false);
      onValidationChange?.(false);
      return;
    }

    try {
      passwordSchema.parse(text);
      setError(null);
      setIsValid(true);
      setShowRequirements(false);
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

  const strengthBarStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(`${strengthInfo?.percentage || 0}%`, { duration: 300 }),
      backgroundColor: strengthInfo?.color || AUTH_COLORS.default,
    };
  });

  // Validaciones individuales
  const hasMinLength = value.length >= 8;
  const hasLowercase = /[a-z]/.test(value);
  const hasUppercase = /[A-Z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const hasSpecial = /[@$!%*?&#]/.test(value);

  return (
    <View className="w-full mb-4">
      <Text className="text-gray-700 text-sm font-semibold mb-2">
        {AUTH_MESSAGES.labels.password}
      </Text>

      <Animated.View style={borderStyle} className="bg-white rounded-xl">
        <View className="flex-row items-center px-4">
          <TextInput
            value={value}
            onChangeText={validatePassword}
            onFocus={() => {
              setIsFocused(true);
              setShowRequirements(true);
            }}
            onBlur={() => setIsFocused(false)}
            placeholder={AUTH_MESSAGES.placeholders.password}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoComplete="password-new"
            className="flex-1 py-3 text-base text-gray-800"
          />
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            className="ml-2"
          >
            <Text className="text-blue-500 text-xs font-semibold">
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </Text>
          </Pressable>
        </View>
      </Animated.View>

      {/* Barra de fuerza de contraseña */}
      {value.length > 0 && (
        <View className="mt-2">
          <View className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <Animated.View style={strengthBarStyle} className="h-full" />
          </View>
          {strengthInfo && (
            <Text
              className="text-xs font-medium mt-1"
              style={{ color: strengthInfo.color }}
            >
              {strengthInfo.strength === 'weak' &&
                AUTH_MESSAGES.passwordValidation.weak}
              {strengthInfo.strength === 'medium' &&
                AUTH_MESSAGES.passwordValidation.medium}
              {strengthInfo.strength === 'strong' &&
                AUTH_MESSAGES.passwordValidation.strong}
            </Text>
          )}
        </View>
      )}

      {/* Requisitos de contraseña */}
      {showRequirements && !isValid && (
        <View className="mt-3 bg-gray-50 rounded-lg p-3">
          <Text className="text-gray-700 text-xs font-semibold mb-2">
            {AUTH_MESSAGES.passwordRequirements.title}
          </Text>
          <Text
            className={`text-xs mb-1 ${
              hasMinLength ? 'text-green-600' : 'text-gray-500'
            }`}
          >
            {hasMinLength ? '✓' : '○'}{' '}
            {AUTH_MESSAGES.passwordRequirements.minLength}
          </Text>
          <Text
            className={`text-xs mb-1 ${
              hasLowercase ? 'text-green-600' : 'text-gray-500'
            }`}
          >
            {hasLowercase ? '✓' : '○'}{' '}
            {AUTH_MESSAGES.passwordRequirements.lowercase}
          </Text>
          <Text
            className={`text-xs mb-1 ${
              hasUppercase ? 'text-green-600' : 'text-gray-500'
            }`}
          >
            {hasUppercase ? '✓' : '○'}{' '}
            {AUTH_MESSAGES.passwordRequirements.uppercase}
          </Text>
          <Text
            className={`text-xs mb-1 ${
              hasNumber ? 'text-green-600' : 'text-gray-500'
            }`}
          >
            {hasNumber ? '✓' : '○'}{' '}
            {AUTH_MESSAGES.passwordRequirements.number}
          </Text>
          <Text
            className={`text-xs ${
              hasSpecial ? 'text-green-600' : 'text-gray-500'
            }`}
          >
            {hasSpecial ? '✓' : '○'}{' '}
            {AUTH_MESSAGES.passwordRequirements.special}
          </Text>
        </View>
      )}

      {/* Mensaje de error */}
      {error && !showRequirements && (
        <Text className="text-red-500 text-xs font-medium mt-1">
          ⚠️ {error}
        </Text>
      )}

      {/* Mensaje de éxito */}
      {isValid && (
        <Text className="text-green-500 text-xs font-medium mt-1">
          ✓ Contraseña fuerte
        </Text>
      )}
    </View>
  );
};