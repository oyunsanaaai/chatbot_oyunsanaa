import { useEffect, useState } from 'react'
import { StreamChat } from 'stream-chat'
import { Chat, Channel, MessageList, MessageInput } from 'stream-chat-react'
import 'stream-chat-react/dist/css/v2/index.css'

export default function App() {
  const [client, setClient] = useState(null)
  const [channel, setChannel] = useState(null)

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/token')
      const r = await res.json()
      const chatClient = StreamChat.getInstance(r.apiKey)
      await chatClient.connectUser(r.user, r.token)
      const ch = chatClient.channel('messaging', r.channelId)
      await ch.watch()
      setClient(chatClient)
      setChannel(ch)
    })()
  }, [])

  if (!client || !channel) return <div>Loading chat...</div>

  return (
    <Chat client={client} theme="str-chat__theme-dark">
      <Channel channel={channel}>
        <MessageList />
        <MessageInput />
      </Channel>
    </Chat>
  )
}
