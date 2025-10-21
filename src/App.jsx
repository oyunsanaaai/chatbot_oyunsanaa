import { StreamChat } from 'stream-chat';

export async function onRequestGet() {
  const apiKey = 'ТАНЫ_API_KEY';
  const apiSecret = 'ТАНЫ_API_SECRET';

  if (!apiKey || !apiSecret) {
    return new Response('Missing Stream credentials', { status: 500 });
  }

  const server = StreamChat.getInstance(apiKey, apiSecret);

  const user = { id: 'oyunsanaa', name: 'Oyunsanaa' };
  const token = server.createToken(user.id);
  const channelId = 'oyunsanaa-general';

  return new Response(
    JSON.stringify({ apiKey, user, token, channelId }),
    { headers: { 'Content-Type': 'application/json' } }
  );
}
