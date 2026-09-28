import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function reactRefreshPreamble() {
  return {
    name: 'storyverse:react-refresh-preamble',
    apply: 'serve',
    enforce: 'pre',
    transformIndexHtml: {
      order: 'pre',
      handler() {
        return [{
          tag: 'script',
          attrs: { type: 'module' },
          children: `import { injectIntoGlobalHook } from '/@react-refresh';
injectIntoGlobalHook(window);
window.$RefreshReg$ = () => {};
window.$RefreshSig$ = () => (type) => type;`
        }]
      }
    }
  }
}

export default defineConfig({
  plugins: [reactRefreshPreamble(), react(), tailwindcss()],
})
