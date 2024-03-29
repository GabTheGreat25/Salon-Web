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
      "@constants": `${srcPath}/constants`,
      "@env": `${srcPath}/env`,
      "@layouts": `${srcPath}/layouts`,
      "@pages": `${srcPath}/pages`,
      "@state": `${srcPath}/state`,
      "@utils": `${srcPath}/utils/DeleteItem`,
      "@validation": `${srcPath}/validation`,
      "@api": `${srcPath}/state/api/reducer`,
      "@auth": `${srcPath}/state/auth/authReducer`,
      "@appointment": `${srcPath}/state/appointment/appointmentReducer`,
      "@hiring": `${srcPath}/state/hiring/hiringReducer`,
      "@reason": `${srcPath}/state/editSchedule/reasonReducer`,
      "@open": `${srcPath}/state/open/openReducer`,
      "@ingredient": `${srcPath}/state/ingredient/ingredientReducer`,
      "@location": `${srcPath}/state/auth/locationReducer`,
      "@waiver": `${srcPath}/state/waiver/waiverReducer`,
      "@fee": `${srcPath}/state/appointment/hasAppointmentReducer`,
      "@discount": `${srcPath}/state/discount/discountReducer`,
      "@notification": `${srcPath}/state/notification/notificationReducer`,
      "@employee": `${srcPath}/state/auth/employeeReducer`,
      "@customer": `${srcPath}/state/auth/customerIdReducer`,
    },
  },
  server: {
    port: 6969,
  },
});
