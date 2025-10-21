import React, { useRef, useState } from 'react'

export default function VoiceButton({ channel }) {
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  const [recording, setRecording] = useState(false)

  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const mr = new MediaRecorder(stream, { mimeType: 'audio/webm' })
    chunksRef.current = []
    mr.ondataavailable = e => e.data.size && chunksRef.current.push(e.data)
    mr.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
      const file = new File([blob], `voice-${Date.now()}.webm`, { type: 'audio/webm' })
      // 1) файл upload
      const res = await channel.sendFile(file)
      // 2) upload-ийн URL-ыг мессежинд хавсаргана
      await channel.sendMessage({
        text: '🎤 Voice message',
        attachments: [{ type: 'audio', asset_url: res.file, title: file.name }],
      })
    }
    mr.start()
    mediaRecorderRef.current = mr
    setRecording(true)
  }

  const stop = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop())
    }
    setRecording(false)
  }

  return (
    <button
      onMouseDown={start}
      onMouseUp={stop}
      onTouchStart={start}
      onTouchEnd={stop}
      style={{
        marginTop: 8,
        padding: '10px 14px',
        borderRadius: 10,
        border: '1px solid #e5e7eb',
        background: recording ? '#ef4444' : '#ffffff',
        color: recording ? '#fff' : '#0f172a',
        cursor: 'pointer'
      }}
      title="Hold to record"
    >
      {recording ? 'Recording… release to send' : '🎤 Hold to record'}
    </button>
  )
}
