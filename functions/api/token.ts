export const onRequestGet: PagesFunction = async (ctx) => {
  // Wix SSO шалгах бол ctx.request.headers.get('Authorization') гэх мэтээр JWT verify
  const user = { id: crypto.randomUUID(), name: 'guest', plan: 'guest', limit: 20 }
  // энд Stream server token үүсгээд буцаана (STREAM_SECRET ашиглана)
  return Response.json({
    apiKey: ctx.env.STREAM_API_KEY,
    user,
    token: "SERVER_GENERATED_TOKEN",    // жинхэнэ token-оо энд үүсгэнэ
    channelId: "oyunsanaa-general"
  })
}
