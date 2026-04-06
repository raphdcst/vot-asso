import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { TuyauProvider } from '@adonisjs/inertia/vue'
import { createInertiaApp } from '@inertiajs/vue3'
import ui from '@nuxt/ui/vue-plugin'
import { createHead, renderSSRHead } from '@unhead/vue/server'

import { renderToString } from '@vue/server-renderer'
import { createSSRApp, h, type DefineComponent } from 'vue'
import { client } from '~/client'
import Layout from '~/layouts/default.vue'

export default function render(page: any) {
  // TODO: add template-based title
  const head = createHead()

  return createInertiaApp({
    page,
    render: renderToString,
    resolve: (name) => {
      return resolvePageComponent(
        `./pages/${name}.vue`,
        import.meta.glob<DefineComponent>('./pages/**/*.vue', { eager: true }),
        Layout
      )
    },
    setup: ({ App, props, plugin }) => {
      return createSSRApp({
        render: () => h(TuyauProvider, { client }, { default: () => h(App, props) }),
      })
        .use(plugin)
        .use(head)
        .use(ui)

      // TODO: register splash screen (ssr)
    },
  }).then(async (app) => {
    const payload = await renderSSRHead(head)
    app.head.push(payload.headTags)
    return app
  })
}
