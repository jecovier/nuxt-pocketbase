import { defu } from 'defu'
import { defineNuxtModule, addPlugin, addImports, createResolver } from '@nuxt/kit'


/**
 * Types
 * ---------------------------------
 */
export interface CredentialType {
  username: string;
  password: string;
}

export interface RegisterType {
  username: string;
  password: string;
  passwordConfirm: string;
  email: string;
}

export interface PasswordResetType {
  email: string;
}

export interface resetPasswordType {
  token:string,
  password:string,
  confirmPassword:string,
}

export interface ClientResponseErrorType {
  code: number,
  message:string,
  data: unknown
}

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
