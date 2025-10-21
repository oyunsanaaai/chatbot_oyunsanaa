import React, { useEffect, useState } from 'react'
import { StreamChat } from 'stream-chat'
import { Chat, Channel, MessageList, MessageInput, ChannelHeader } from 'stream-chat-react'
import 'stream-chat-react/dist/css/v2/index.css'

export default function App() {
  const [client, setClient] = useState(null)
  const [channel, setChannel] = useState(null)

  useEffect(() => {
    (async () => {
      const r = await fetch('/api/token').then(x => x.json())
      const c = StreamChat.getInstance(r.apiKey)
      await c.connectUser(r.user, r.token)

      const ch = c.channel('messaging', r.channelId, { members: [r.user.id] })
      try { await ch.create() } catch {}
      await ch.watch()

      setClient(c)
      setChannel(ch)
    })()
  }, [])

  if (!client || !channel) return <div style={{ padding: 16 }}>Loading chat...</div>

  return (
    <Chat client={client} theme="str-chat__theme-dark">
      <Channel channel={channel}>
        <ChannelHeader />
        <MessageList />
        <MessageInput />
      </Channel>
    </Chat>
  )
  import VoiceButton from './VoiceButton'   // дээр талд import хийнэ

// ...
<Channel channel={channel}>
  <MessageList />
  <MessageInput />
  <VoiceButton channel={channel} />
</Channel>
}
