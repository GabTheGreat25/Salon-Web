import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "url";
import million from "million/compiler";

const srcPath = fileURLToPath(new URL("./src", import.meta.url));

export default defineConfig({
  plugins: [million.vite({ auto: true, mute: true }), react()],
  resolve: {
    alias: {
      "@": srcPath,
      "@assets": `${srcPath}/assets`,
      "@components": `${srcPath}/components`,
      // "@generateKey": `${srcPath}/services/generateKey`,
      // "@dataTable": `${srcPath}/services/dataTable`,
      // "@transactions": `${srcPath}/page/Transactions`,
      // "@api": `${srcPath}/state/api/reducer`,
      // "@auth": `${srcPath}/state/auth/authReducer`,
      // "@sidebar": `${srcPath}/state/sidebar/authSideBar`,
    },
  },
  server: {
    port: 6969,
  },
});
