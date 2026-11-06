// Forwards /api/* to the case's API, as netlify.toml used to, so the browser
// can call it from this site's own domain. Everything else is static files,
// but a path with no file still reaches this Worker, so it gets a 404.
const API = 'https://technical-case.dreaminfluencers.com'

export default {
  fetch(request) {
    const url = new URL(request.url)
    if (!url.pathname.startsWith('/api/')) {
      return new Response('Not found', { status: 404 })
    }
    return fetch(API + url.pathname.slice('/api'.length) + url.search, request)
  }
}
