// Remove the 'path' import if it's unused elsewhere
// import path from "path"
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react()],
    // Remove this entire 'resolve' block:
    // resolve: {
    //   alias: {
    //     "@": path.resolve(__dirname, "./src"),
    //   },
    // },
});
