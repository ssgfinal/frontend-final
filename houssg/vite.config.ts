import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		// open: true,
		host: true,
		port: 8080, // This is the port which we will use in docker
		watch: {
			usePolling: true,
		},
	},
});
