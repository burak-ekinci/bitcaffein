import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.VITE_KEY_NETWORK_ID": JSON.stringify(
      process.env.VITE_KEY_NETWORK_ID
    ),
    "process.env.VITE_KEY_NETWORK_NAME": JSON.stringify(
      process.env.VITE_KEY_NETWORK_NAME
    ),
    "process.env.VITE_KEY_TARGET_NETWORK_ID": JSON.stringify(
      process.env.VITE_KEY_TARGET_NETWORK_ID
    ),
    "process.env.VITE_KEY_API_CONNECTION_STRING": JSON.stringify(
      process.env.VITE_KEY_TARGET_NETWORK_ID
    ),
  },
});
