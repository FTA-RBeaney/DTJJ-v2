export default defineNuxtRouteMiddleware((to) => {
  if (to.fullPath.indexOf("/user/") > -1) {
    // Cast to any because current setPageLayout typings only accept false | "admin"
    setPageLayout("user" as any);
  }
});
