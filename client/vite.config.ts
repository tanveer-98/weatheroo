import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.png', '**/*.jpeg','**/*.jpg'],
  // server: {https:false,
  //   proxy: {
  //     '/api': {
  //         //  target: "https://blog-server-i6uh.onrender.com",
  //          target: "http://localhost:3000",
          
  //          changeOrigin: true,
  //          secure: false,      
  //          ws: true,
  //      }
      
  // }},
})
