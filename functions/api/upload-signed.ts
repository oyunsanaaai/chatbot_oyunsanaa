export const onRequestPost: PagesFunction = async ({ request, env }) => {
  // MIME/type шалгаад R2 pre-signed маягийн PUT-г proxy-оор зохицуулж болно
  // энгийн хувилбар: шууд PUT хийж object нэр үүсгээд public URL буцаах
  const key = crypto.randomUUID()
  await env.R2_BUCKET.put(key, await request.arrayBuffer(), {
    httpMetadata: { contentType: request.headers.get('content-type') || 'application/octet-stream' }
  })
  return Response.json({
    publicUrl: `https://<таны-cdn-domain>/${key}`
  })
}
