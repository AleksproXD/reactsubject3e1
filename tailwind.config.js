/** @type {import('tailwindcss').Config} */
module.exports = {
  // Rutas actualizadas para incluir app/ y src/
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",           // ← Carpeta app (routing)
    "./src/**/*.{js,jsx,ts,tsx}",           // ← Carpeta src (componentes, screens, etc)
    "./components/**/*.{js,jsx,ts,tsx}",    // ← Por si tienes components en raíz
    "./App.{js,jsx,ts,tsx}",                // ← Archivo App en raíz (si existe)
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}