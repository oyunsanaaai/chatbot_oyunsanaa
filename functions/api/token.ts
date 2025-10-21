import { StreamChat } from 'stream-chat';

export async function onRequestGet() {
  try {
    const apiKey = 'vrsh2xymnkrj'; // ← Stream Dashboard → Chat Overview → App Access Keys
    const apiSecret = 'ТЭНДХАРАГДАЖБАЙГААСЕКРЕТ'; // ← Click to reveal хийж хуул
    const userId = 'oyunsanaa';

    const serverClient = StreamChat.getInstance(apiKey, apiSecret);
    const token = serverClient.createToken(userId);

    return new Response(
      JSON.stringify({ token }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
