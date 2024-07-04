// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//     plugins: [react()],
//     server: {
//         proxy: {
//             '/api': 'http://localhost:8080',
//         },
//     },
// });
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd()); // Cargar variables de entorno

  return {
    plugins: [react()],
    base: '/',
    server: {
      proxy: env.NODE_ENV === 'production' ? {} : { // Proxy solo en desarrollo
        '/api': 'http://localhost:8080',
      },
    },
  };
});
