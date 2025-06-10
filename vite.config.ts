import { loadEnv, type ConfigEnv, type UserConfig } from "vite";

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const { VITE_PORT } = loadEnv(mode, root);

  const isBuild = command === "build";
  return {
    server: {
      host: true,
      open: true,
      port: Number(VITE_PORT),
      watch: {
        usePolling: true,
      },
    },
    plugins: [],
    build: {
      target: "es2015",
      cssTarget: "chrome86",
      minify: "terser",
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: isBuild,
        },
      },
      chunkSizeWarningLimit: 600,
      outDir: "./build",
    },
    resolve: {
      alias: [{ find: /^~/, replacement: "" }],
    },
  };
};
