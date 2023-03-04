import { defu } from 'defu'
import { defineNuxtModule, addPlugin, addImports, createResolver } from '@nuxt/kit'

// Module options TypeScript inteface definition
export interface ModuleOptions {
  url: string
  loginRoute?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-pocketbase',
    configKey: 'nuxtPocketbase'
  },
  // Default configuration options of the Nuxt module
  defaults: {
    url: '',
    loginRoute: '/auth/login'
  },
  setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // OPTIONS
    nuxt.options.runtimeConfig.public.pocketbase = defu(
      nuxt.options.runtimeConfig.public.pocketbase,
        {
        url: options.url,
        loginRoute: options.loginRoute,
      }
    )

    // PLUGIN
    addPlugin(resolver.resolve('./runtime/plugin'))

    // COMPOSABLE
    addImports([
      { from: resolver.resolve('./runtime/usePocketbase'), name: 'usePocketbase', as: 'usePocketbase' },
      { from: resolver.resolve('./runtime/useAuthPocketbase'), name: 'useAuthPocketbase', as: 'useAuthPocketbase' },
    ])
  }
})
