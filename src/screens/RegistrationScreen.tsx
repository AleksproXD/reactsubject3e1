import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NameInput } from '../components/NameInput';
import { AuthEmailInput } from '../components/AuthEmailInput';
import { PasswordInput } from '../components/PasswordInput';
import { AUTH_MESSAGES } from '../constants/authMessages';
import { registrationSchema } from '../schemas/authSchema';

export const RegistrationScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const isFormValid = isNameValid && isEmailValid && isPasswordValid;

  const handleRegister = () => {
    try {
      // Validación final con Zod
      const data = registrationSchema.parse({
        name,
        email,
        password,
      });

      setIsSubmitted(true);

      Alert.alert(
        '🎉 ¡Registro Exitoso!',
        `Bienvenido ${data.name}!\n\nTu cuenta ha sido creada con el email:\n${data.email}`,
        [{ text: 'Continuar' }]
      );
    } catch (error: any) {
      Alert.alert(
        'Error de validación',
        'Por favor verifica que todos los campos sean correctos',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-blue-50 to-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="flex-grow py-6"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="items-center mb-8 px-6">
            <View className="bg-blue-500 w-24 h-24 rounded-full items-center justify-center mb-4 shadow-lg">
              <Text className="text-white text-5xl">🔐</Text>
            </View>

            <Text className="text-3xl font-bold text-gray-800 mb-2">
              Crear Cuenta
            </Text>

            <Text className="text-gray-600 text-center text-base">
              Completa el formulario para registrarte
            </Text>
          </View>

          {/* Formulario */}
          <View className="px-6">
            <View className="bg-white rounded-2xl p-6 shadow-sm">
              {/* Input de Nombre */}
              <NameInput
                value={name}
                onChangeText={setName}
                onValidationChange={setIsNameValid}
              />

              {/* Input de Email */}
              <AuthEmailInput
                value={email}
                onChangeText={setEmail}
                onValidationChange={setIsEmailValid}
              />

              {/* Input de Contraseña */}
              <PasswordInput
                value={password}
                onChangeText={setPassword}
                onValidationChange={setIsPasswordValid}
              />

              {/* Botón de Registro */}
              <Pressable
                onPress={handleRegister}
                disabled={!isFormValid}
                className={`mt-4 py-4 rounded-xl ${
                  isFormValid
                    ? 'bg-blue-500 active:bg-blue-600'
                    : 'bg-gray-300'
                }`}
              >
                <Text
                  className={`text-center text-base font-bold ${
                    isFormValid ? 'text-white' : 'text-gray-500'
                  }`}
                >
                  {AUTH_MESSAGES.labels.registerButton}
                </Text>
              </Pressable>
            </View>

            {/* Resultado del registro */}
            {isSubmitted && (
              <View className="mt-6 bg-green-50 border-2 border-green-500 rounded-xl p-4">
                <Text className="text-green-700 font-bold text-base mb-2">
                  ✅ Registro Completado
                </Text>
                <Text className="text-green-700 text-sm mb-1">
                  <Text className="font-semibold">Nombre:</Text> {name}
                </Text>
                <Text className="text-green-700 text-sm mb-1">
                  <Text className="font-semibold">Email:</Text> {email}
                </Text>
                <Text className="text-green-700 text-sm">
                  <Text className="font-semibold">Contraseña:</Text> {'*'.repeat(
                    password.length
                  )}
                </Text>
              </View>
            )}
          </View>

          {/* Info adicional */}
          <View className="mt-8 mx-6 bg-blue-50 rounded-xl p-4">
            <Text className="text-blue-900 font-semibold mb-2">
              🔒 Seguridad de tu cuenta:
            </Text>
            <Text className="text-blue-800 text-xs mb-1">
              • Validación en tiempo real estilo Gmail
            </Text>
            <Text className="text-blue-800 text-xs mb-1">
              • Indicador de fuerza de contraseña
            </Text>
            <Text className="text-blue-800 text-xs mb-1">
              • Requisitos de seguridad visibles
            </Text>
            <Text className="text-blue-800 text-xs">
              • Animaciones fluidas con Reanimated
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};