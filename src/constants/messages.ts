/**
 * Constantes de mensajes user-friendly para la aplicación
 * Centraliza todos los mensajes de la UI
 */

export const MESSAGES = {
  // Mensajes de validación
  validation: {
    emailRequired: 'Por favor ingresa tu correo electrónico',
    emailInvalid: 'El formato del email no es válido',
    emailValid: '✓ Email válido',
  },

  // Placeholders
  placeholders: {
    email: 'ejemplo@correo.com',
  },

  // Labels
  labels: {
    emailInput: 'Correo Electrónico',
    validateButton: 'Validar Email',
  },

  // Mensajes de éxito
  success: {
    emailValidated: '¡Email validado correctamente!',
  },

  // Mensajes de error
  errors: {
    generic: 'Ocurrió un error. Por favor intenta nuevamente.',
  },
};

// Colores para diferentes estados
export const VALIDATION_COLORS = {
  default: '#6B7280', // gray-500
  error: '#EF4444',   // red-500
  success: '#10B981', // green-500
  focus: '#3B82F6',   // blue-500
};