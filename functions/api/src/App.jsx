import { useEffect, useState } from 'react'
import { StreamChat } from 'stream-chat'
import { Chat, Channel, MessageList, MessageInput } from 'stream-chat-react'
import 'stream-chat-react/dist/css/v2/index.css'

export default function App(){
  const [c,setC]=useState(),[ch,setCh]=useState()
  useEffect(()=>{(async()=>{
    const r=await fetch('/api/token').then(r=>r.json())
    const cli=StreamChat.getInstance(r.apiKey)
    await cli.connectUser(r.user, r.token)
    const channel=cli.channel('messaging', r.channelId); await channel.watch()
    setC(cli); setCh(channel)
  })()},[])
  if(!c||!ch) return null
  return <Chat client={c} theme="str-chat__theme-dark"><Channel channel={ch}>
    <MessageList/><MessageInput/> {/* зураг/дуу attach бэлэн */}
  </Channel></Chat>
}
