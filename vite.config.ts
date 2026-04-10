import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Pages from 'vite-plugin-pages';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    // 像 Nuxt 一样自动扫描路由
    Pages({
      dirs: 'src/views', // 你的页面组件存放目录
      extensions: ['tsx', 'jsx'],
    }),
  ],
  resolve: {
    alias: {
      // 保持你之前的 @ 别名生效
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        // 必须开启，否则 antd-mobile 内部样式可能报错
        javascriptEnabled: true,
      },
    },
  },
  server: {
    port: 3000,
    proxy: {
      // 如果你之前在 craco 配置过代理，在这里迁移
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
});
