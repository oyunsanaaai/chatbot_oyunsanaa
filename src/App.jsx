import { useEffect, useState } from 'react'
import { StreamChat } from 'stream-chat'
import { Chat, Channel, MessageList, MessageInput } from 'stream-chat-react'
import 'stream-chat-react/dist/css/v2/index.css'

export default function App(){
  const [client,setClient]=useState(),[ch,setCh]=useState()
  useEffect(()=>{(async()=>{
    const r=await fetch('/api/token').then(r=>r.json())
    const c=StreamChat.getInstance(r.apiKey); await c.connectUser(r.user, r.token)
    const chn=c.channel('messaging', r.channelId); await chn.watch()
    setClient(c); setCh(chn)
  })()},[])
  if(!client||!ch) return null
  return <Chat client={client} theme="str-chat__theme-dark">
    <Channel channel={ch}><MessageList/><MessageInput/></Channel>
  </Chat>
}
