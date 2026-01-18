export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser();

  // List of routes that require authentication
  // Note: /confirm is NOT protected because it's the OAuth callback page
  const protectedRoutes = ["/account"];

  // Check if the current route requires authentication
  const isProtectedRoute = protectedRoutes.some((route) =>
    to.path.startsWith(route)
  );

  // If the route is protected and user is not logged in, redirect to login
  if (isProtectedRoute && !user.value) {
    return navigateTo("/login");
  }
});
