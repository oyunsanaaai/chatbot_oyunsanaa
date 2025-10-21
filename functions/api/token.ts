import { StreamChat } from 'stream-chat'
export const onRequestGet: PagesFunction = async (ctx) => {
  const server = StreamChat.getInstance(ctx.env.STREAM_API_KEY, ctx.env.STREAM_SECRET)
  const user = { id: crypto.randomUUID(), name: 'guest', plan: 'guest' }
  const token = server.createToken(user.id)
  return Response.json({ apiKey: ctx.env.STREAM_API_KEY, user, token, channelId: 'oyunsanaa-general' })
}
