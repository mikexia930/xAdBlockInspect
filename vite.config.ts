import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// 插件
const libraryConfig = defineConfig({
  build: {
    lib: {
      entry: 'packages/xAdBlockInspect/src/index.ts',
      name: 'XAdBlockInspect',
      formats: ['es', 'umd', 'cjs'],
      fileName: (format) => `x-ad-block-inspect.${format}.js`
    },
    rollupOptions: {
      external: [],
      output: {}
    },
    outDir: 'lib'
  },
  plugins: [dts()]
});

// demo 应用配置
const demoConfig = defineConfig({
  build: {
    outDir: 'docs'
  }
});

// 根据环境变量确定使用哪个配置
export default ({ mode }) => {
  if (mode === 'library') {
    return libraryConfig;
  } else {
    return demoConfig;
  }
};
