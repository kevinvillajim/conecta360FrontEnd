import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "https://kevinvillajim.github.io/conecta360FrontEnd/",
	optimizeDeps: {
		include: ["@emotion/react", "@emotion/styled"],
	},
});
