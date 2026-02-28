export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules: ['@nuxt/ui', '@nuxtjs/sitemap', '@nuxtjs/robots'],
  site: {
    url: 'http://localhost:3000',
  },
  sitemap: {
    sources: ['/api/__sitemap__/urls'],
  },
  robots: {
    allow: ['/', '/blog', '/about'],
    disallow: ['/admin', '/api/'],
  },
})
