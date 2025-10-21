// functions/api/token.ts
// Cloudflare Pages Functions — Stream Chat JWT (HS256) үүсгэнэ

type Env = {
  STREAM_API_KEY: string
  STREAM_SECRET: string
}

const enc = new TextEncoder()
const b64url = (buf: ArrayBuffer | Uint8Array) =>
  btoa(String.fromCharCode(...new Uint8Array(buf as ArrayBuffer)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/,'')

async function signHS256(secret: string, data: string) {
  const key = await crypto.subtle.importKey(
    "raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  )
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data))
  return b64url(sig)
}

export const onRequestGet: PagesFunction<Env> = async (ctx) => {
  const apiKey   = ctx.env.STREAM_API_KEY
  const apiSecret= ctx.env.STREAM_SECRET
  if (!apiKey || !apiSecret) {
    return new Response("Missing STREAM_API_KEY/STREAM_SECRET", { status: 500 })
  }

  // Туршилтын хэрэглэгч (дараа нь Wix-ийн ID-гаар солино)
  const user = { id: "oyunsanaa", name: "Oyunsanaa" }
  const channelId = "oyunsanaa-general"

  // JWT header + payload
  const now = Math.floor(Date.now()/1000)
  const header  = b64url(enc.encode(JSON.stringify({ alg: "HS256", typ: "JWT" })))
  const payload = b64url(enc.encode(JSON.stringify({
    user_id: user.id, iat: now, exp: now + 60*60   // 1 цаг хүчинтэй
  })))
  const unsigned = `${header}.${payload}`
  const signature = await signHS256(apiSecret, unsigned)
  const token = `${unsigned}.${signature}`

  return new Response(
    JSON.stringify({ apiKey, user, token, channelId }),
    { headers: { "Content-Type": "application/json" } }
  )
}
