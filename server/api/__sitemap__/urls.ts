const blogSlugs = ['nuxt-ssr', 'nitro-api', 'usefetch']

export default defineSitemapEventHandler(() => {
  return blogSlugs.map(slug => ({ loc: '/blog/' + slug }))
})
