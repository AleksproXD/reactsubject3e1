import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Alert } from 'react-native';
import { EmailInput } from '../components/EmailInput';
import { MESSAGES } from '../constants/messages';

export const EmailValidationScreen: React.FC = () => {
  const [validatedEmail, setValidatedEmail] = useState<string | null>(null);

  const handleValidEmail = (email: string) => {
    setValidatedEmail(email);
    Alert.alert(
      '¡Éxito!',
      `${MESSAGES.success.emailValidated}\n\nEmail: ${email}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView 
        contentContainerClassName="flex-grow justify-center py-8"
        keyboardShouldPersistTaps="handled"
      >
        <View className="items-center mb-8">
          {/* Header */}
          <View className="bg-blue-500 w-20 h-20 rounded-full items-center justify-center mb-4">
            <Text className="text-white text-4xl">📧</Text>
          </View>
          
          <Text className="text-3xl font-bold text-gray-800 mb-2">
            Validación de Email
          </Text>
          
          <Text className="text-gray-600 text-center px-6 text-base">
            Ingresa tu correo electrónico para validarlo
          </Text>
        </View>

        {/* Email Input Component */}
        <EmailInput onValidEmail={handleValidEmail} />

        {/* Resultado de la validación */}
        {validatedEmail && (
          <View className="mt-8 mx-6 bg-green-50 border-2 border-green-500 rounded-xl p-4">
            <Text className="text-green-700 font-semibold text-base mb-1">
              Email Validado:
            </Text>
            <Text className="text-green-900 text-lg font-bold">
              {validatedEmail}
            </Text>
          </View>
        )}

        {/* Info adicional */}
        <View className="mt-8 mx-6 bg-blue-50 rounded-xl p-4">
          <Text className="text-blue-900 font-semibold mb-2">
            ℹ️ Características:
          </Text>
          <Text className="text-blue-800 text-sm mb-1">
            • Validación en tiempo real con Zod
          </Text>
          <Text className="text-blue-800 text-sm mb-1">
            • Animaciones fluidas con Reanimated
          </Text>
          <Text className="text-blue-800 text-sm mb-1">
            • Estilos con Tailwind CSS
          </Text>
          <Text className="text-blue-800 text-sm">
            • Feedback visual inmediato
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};