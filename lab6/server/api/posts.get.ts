const posts = [
  { slug: 'nuxt-ssr', title: 'Lorem ipsum dolor sit amet', excerpt: 'Consectetur adipiscing elit, sed do eiusmod tempor.', date: '2025-02-01' },
  { slug: 'nitro-api', title: 'Sed ut perspiciatis unde', excerpt: 'Omnis iste natus error sit voluptatem accusantium.', date: '2025-02-10' },
  { slug: 'usefetch', title: 'Nemo enim ipsam voluptatem', excerpt: 'Quia voluptas sit aspernatur aut odit aut fugit.', date: '2025-02-20' },
]

export default defineEventHandler(() => {
  return posts
})
