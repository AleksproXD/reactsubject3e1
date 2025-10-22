import { z } from 'zod';

/**
 * Schema de validación para el registro completo
 * Incluye validaciones para nombre, email y contraseña
 */

// Validación de nombre
export const nameSchema = z
  .string()
  .min(1, 'El nombre es requerido')
  .min(2, 'El nombre debe tener al menos 2 caracteres')
  .max(50, 'El nombre no puede tener más de 50 caracteres')
  .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras y espacios')
  .trim();

// Validación de email
export const emailSchema = z
  .string()
  .min(1, 'El email es requerido')
  .email('Formato de email inválido')
  .toLowerCase()
  .trim();

// Validación de contraseña (estilo Gmail)
export const passwordSchema = z
  .string()
  .min(1, 'La contraseña es requerida')
  .min(8, 'La contraseña debe tener al menos 8 caracteres')
  .regex(/[a-z]/, 'Debe contener al menos una letra minúscula')
  .regex(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
  .regex(/[0-9]/, 'Debe contener al menos un número')
  .regex(/[@$!%*?&#]/, 'Debe contener al menos un carácter especial (@$!%*?&#)');

// Schema completo del formulario
export const registrationSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

// Type inference para TypeScript
export type RegistrationFormData = z.infer<typeof registrationSchema>;

// Función helper para validar fuerza de contraseña
export const getPasswordStrength = (password: string): {
  strength: 'weak' | 'medium' | 'strong';
  percentage: number;
  color: string;
} => {
  let strength = 0;
  
  if (password.length >= 8) strength += 25;
  if (password.length >= 12) strength += 25;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 20;
  if (/[0-9]/.test(password)) strength += 15;
  if (/[@$!%*?&#]/.test(password)) strength += 15;
  
  if (strength < 50) {
    return { strength: 'weak', percentage: strength, color: '#EF4444' };
  } else if (strength < 80) {
    return { strength: 'medium', percentage: strength, color: '#F59E0B' };
  } else {
    return { strength: 'strong', percentage: strength, color: '#10B981' };
  }
};