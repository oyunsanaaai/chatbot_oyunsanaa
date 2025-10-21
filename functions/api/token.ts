export async function onRequestGet() {
  const apiKey = "ТАНЫ_STREAM_API_KEY";
  const apiSecret = "ТАНЫ_STREAM_API_SECRET";

  if (!apiKey || !apiSecret) {
    return new Response("Missing Stream credentials", { status: 500 });
  }

  // Stream API-г Cloudflare fetch ашиглаж дуудна
  const user = { id: "oyunsanaa", name: "Oyunsanaa" };

  // Stream-ийн сервер талд токен үүсгэх API endpoint
  const response = await fetch("https://chat.stream-io-api.com/api/v1.0/devices", {
    method: "GET",
    headers: {
      "Authorization": apiSecret,
      "Stream-Auth-Type": "jwt",
      "Content-Type": "application/json",
      "X-Stream-Client": "stream-chat-cloudflare"
    }
  }).catch((err) => new Response("Stream fetch failed: " + err.message, { status: 500 }));

  const token = btoa(`${user.id}:${apiKey}`);
  const channelId = "oyunsanaa-general";

  return new Response(
    JSON.stringify({ apiKey, user, token, channelId }),
    { headers: { "Content-Type": "application/json" } }
  );
}
