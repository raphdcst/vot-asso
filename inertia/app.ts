import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { TuyauProvider } from '@adonisjs/inertia/vue'
import '@fontsource/public-sans/300.css'
import '@fontsource/space-grotesk/400.css'
import { createInertiaApp } from '@inertiajs/vue3'
import ui from '@nuxt/ui/vue-plugin'
import { createApp, type DefineComponent, h } from 'vue'
import 'vue-sonner/style.css'
import { client } from '~/client'
import Layout from '~/layouts/default.vue'
import './css/app.css'

const appName = import.meta.env.PUBLIC_APP_NAME

createInertiaApp({
  title: (title) => (title ? title.replace('%s', appName) : appName),
  resolve: (name) => {
    return resolvePageComponent(
      `./pages/${name}.vue`,
      import.meta.glob<DefineComponent>('./pages/**/*.vue'),
      Layout
    )
  },
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(TuyauProvider, { client }, { default: () => h(App, props) }) })
      .use(plugin)
      .use(ui)
      .mount(el)

    const splash = document.getElementById('splash-screen')
    if (splash) {
      splash.classList.remove('opacity-100')
      splash.classList.add('opacity-0')

      setTimeout(() => {
        splash.remove()
      }, 500)
    }
  },
  progress: {
    color: '#4B5563',
  },
})
