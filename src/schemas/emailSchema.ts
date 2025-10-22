import { z } from 'zod';

/**
 * Schema de validación para email usando Zod
 * Define las reglas de validación para el campo de email
 */
export const emailSchema = z.object({
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Formato de email inválido')
    .toLowerCase()
    .trim(),
});

// Type inference para TypeScript
export type EmailFormData = z.infer<typeof emailSchema>;
