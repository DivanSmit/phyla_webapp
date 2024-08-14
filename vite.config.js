// import { sveltekit } from '@sveltejs/kit/vite';
// import { defineConfig } from 'vite';
// import dotenv from 'dotenv';

// // Load environment variables from .env file
// dotenv.config();

// export default defineConfig({
//   plugins: [sveltekit()],
//   define: {
//     'process.env': {
//       VITE_BACKEND_IP: JSON.stringify(process.env.VITE_BACKEND_IP),
//       VITE_BACKEND_PORT: JSON.stringify(process.env.VITE_BACKEND_PORT),
//     }
//   },
//   test: {
//     include: ['src/**/*.{test,spec}.{js,ts}']
//   }
// });

// HTTPS connection
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost.crt'))
    },
    host: true
  },
  define: {
    'process.env': {
      VITE_BACKEND_IP: JSON.stringify(process.env.VITE_BACKEND_IP),
      VITE_BACKEND_PORT: JSON.stringify(process.env.VITE_BACKEND_PORT),
    }
  },
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
});


// The original file!

// import { sveltekit } from '@sveltejs/kit/vite';
// import { defineConfig } from 'vitest/config';

// export default defineConfig({
// 	plugins: [sveltekit()],
// 	test: {
// 		include: ['src/**/*.{test,spec}.{js,ts}']
// 	}
// });

