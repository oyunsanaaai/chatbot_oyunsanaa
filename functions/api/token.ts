import { StreamChat } from 'stream-chat';

export async function onRequestGet() {
  try {
    // Stream-ийн Chat Overview доторх "App Access Keys"-оос хуулна
    const apiKey = 'vrsh2xymnkrj'; // ← энэ чинь байгаа
    const apiSecret = 'ТЭНДХАРАГДАЖБАЙГАА_SECRET_ТАНЫ'; // ← "Click to reveal" хийж хуул
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
