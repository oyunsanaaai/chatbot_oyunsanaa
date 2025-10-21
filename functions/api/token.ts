import { StreamChat } from 'stream-chat';

export async function onRequestGet() {
  const apiKey = 'ТАНЫ_STREAM_API_KEY';
  const apiSecret = 'ТАНЫ_STREAM_SECRET';

  // Түр туршилтад тогтмол user; дараа нь Wix-ээр солих
  const user = { id: 'oyunsanaa', name: 'Oyunsanaa', plan: 'guest' };
  const channelId = 'oyunsanaa-general';

  const server = StreamChat.getInstance(apiKey, apiSecret);
  const token = server.createToken(user.id);

  return new Response(
    JSON.stringify({ apiKey, user, token, channelId }),
    { headers: { 'Content-Type': 'application/json' } }
  );
}
