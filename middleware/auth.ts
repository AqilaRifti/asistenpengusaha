// @ts-nocheck
export default defineNuxtRouteMiddleware(async () => {
  
  if (error) {
    console.error('Error fetching session:', error.message)
  }

  if (!session) {
    return navigateTo('/login')
  }
})
