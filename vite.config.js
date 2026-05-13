import { defineConfig } from 'vite'
import react from '@vitejs/react-swc'

export default defineConfig({
  plugins: [react()],
  publicDir: 'public', // Vite'e public klasörünü kullanmasını açıkça söylüyoruz
})