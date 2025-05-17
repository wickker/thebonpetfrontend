import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig, UserConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }: UserConfig) => {
  if (!mode) return {}

  const config = loadEnv(mode, process.cwd(), '')

  console.log(`🍀 Mode: ${mode}`)
  console.log(`🍀 Env: ${config.VITE_ENVIRONMENT}`)

  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: 3000,
      allowedHosts: ['043b-112-199-166-27.ngrok-free.app'],
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  }
})
