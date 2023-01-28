import { defineNuxtPlugin } from '#app'
import PocketBase from "pocketbase";

type Cookie = {
  token: string;
  model: any;
};

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();
  const pb = new PocketBase(config.pocketbase.url);

  const cookie = useCookie<Cookie>("pb_auth", {
    path: "/",
    secure: true,
    sameSite: "strict",
    httpOnly: false, // change to "true" if you want only server-side access
    maxAge: 604800,
  });

  // load the store data from the cookie value
  pb.authStore.save(cookie.value?.token || "", cookie.value?.model);

  // send back the default 'pb_auth' cookie to the client with the latest store state
  pb.authStore.onChange(() => {
    cookie.value = {
      token: pb.authStore.token,
      model: pb.authStore.model,
    };
  });

  try {
    // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
    pb.authStore.isValid && (await pb.collection("users").authRefresh());
  } catch (_) {
    // clear the auth store on failed refresh
    pb.authStore.clear();
  }

  addRouteMiddleware("auth-pocketbase", () => {
    if (!pb.authStore.token) {
      return navigateTo(config.pocketbase.loginRoute);
    }
  });

  return {
    provide: { pb },
  };
});

// crear un middleware aqui que verifique si el
// usuario esta o no logeado, si no esta logeado
// que lo envie a una url de login definida por
// el usuario.

// tambien verificar si el authStore
