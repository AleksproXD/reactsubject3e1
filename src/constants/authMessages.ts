/**
 * Constantes de mensajes para autenticación
 */

export const AUTH_MESSAGES = {
    // Labels
    labels: {
      name: 'Nombre completo',
      email: 'Correo electrónico',
      password: 'Contraseña',
      registerButton: 'Crear cuenta',
    },
  
    // Placeholders
    placeholders: {
      name: 'Juan Pérez',
      email: 'ejemplo@correo.com',
      password: 'Mínimo 8 caracteres',
    },
  
    // Validación de nombre
    nameValidation: {
      valid: '✓ Nombre válido',
      tooShort: 'El nombre es muy corto',
      tooLong: 'El nombre es muy largo',
      invalidCharacters: 'Solo se permiten letras',
    },
  
    // Validación de email
    emailValidation: {
      valid: '✓ Email válido',
      invalid: 'Email inválido',
      required: 'El email es requerido',
    },
  
    // Validación de contraseña
    passwordValidation: {
      weak: 'Contraseña débil',
      medium: 'Contraseña media',
      strong: 'Contraseña fuerte',
      showPassword: 'Mostrar contraseña',
      hidePassword: 'Ocultar contraseña',
    },
  
    // Requisitos de contraseña
    passwordRequirements: {
      title: 'La contraseña debe contener:',
      minLength: '• Al menos 8 caracteres',
      lowercase: '• Una letra minúscula',
      uppercase: '• Una letra mayúscula',
      number: '• Un número',
      special: '• Un carácter especial (@$!%*?&#)',
    },
  
    // Mensajes de éxito
    success: {
      registered: '¡Cuenta creada exitosamente!',
    },
  };
  
  // Colores para estados
  export const AUTH_COLORS = {
    default: '#9CA3AF',     // gray-400
    error: '#EF4444',       // red-500
    success: '#10B981',     // green-500
    warning: '#F59E0B',     // amber-500
    focus: '#3B82F6',       // blue-500
    weak: '#EF4444',        // red-500
    medium: '#F59E0B',      // amber-500
    strong: '#10B981',      // green-500
  };