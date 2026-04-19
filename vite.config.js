import react from "@vitejs/plugin-react";
import {defineConfig} from "vite";
import {ROUTER_BASENAME} from "./src/Shared/Constants/RouterConstants.js";

export default defineConfig({
	plugins: [react()],
	assetsInclude: ["**/*.svg"],
	base: ROUTER_BASENAME + '/',
});
