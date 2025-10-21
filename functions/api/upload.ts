export const onRequestPost: PagesFunction = async ({ request, env }) => {
  const key = crypto.randomUUID()
  const buf = await request.arrayBuffer()
  await env.R2_BUCKET.put(key, buf, {
    httpMetadata: { contentType: request.headers.get('content-type') || 'application/octet-stream' }
  })
  return Response.json({ key, url: `/r2/${key}` })
}
