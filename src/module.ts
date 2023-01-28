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
    nuxt.options.runtimeConfig.pocketbase = {
      url: options.url,
      loginRoute: options.loginRoute,
    }

    // PLUGIN
    addPlugin(resolver.resolve('./runtime/plugin'))

    // COMPOSABLE
    const composable = resolver.resolve('./runtime/composable')
    addImports([
      { from: composable, name: 'usePocketbase' }
    ])
  }
})
