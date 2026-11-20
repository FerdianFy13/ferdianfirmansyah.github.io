// Blocks opening /resume/*.pdf directly (address bar, link, iframe, embed).
// Requests made by the site's own fetch() (PDF.js) send Sec-Fetch-Dest: empty and pass through.
const BLOCKED_DEST = new Set(['document', 'iframe', 'frame', 'embed', 'object']);

export default async (request, context) => {
  const dest = request.headers.get('sec-fetch-dest');

  if (dest && BLOCKED_DEST.has(dest)) {
    return new Response('Forbidden', { status: 403 });
  }

  return context.next();
};
