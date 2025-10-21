import { useEffect, useState } from 'react'
import { StreamChat } from 'stream-chat'
import { Chat, Channel, MessageList, MessageInput } from 'stream-chat-react'
import 'stream-chat-react/dist/css/v2/index.css'

export default function App(){
  const [client,setClient]=useState(); const [channel,setChannel]=useState()
  useEffect(()=>{(async()=>{
    const { apiKey,user,token,channelId } = await fetch('/api/token').then(r=>r.json())
    const c = StreamChat.getInstance(apiKey); await c.connectUser(user, token)
    const ch = c.channel('messaging', channelId); await ch.watch()
    setClient(c); setChannel(ch)
  })()},[])
  if(!client||!channel) return null
  return <Chat client={client}><Channel channel={channel}>
    <MessageList/><MessageInput/>
  </Channel></Chat>
}
