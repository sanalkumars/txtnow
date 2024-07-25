import { useAppStore } from '@/store'
import React from 'react'

const ChatPage = () => {
  const { userInfo } = useAppStore();
  return (
    <div>ChatPage
      <div>
        email:{userInfo.email}
        email:{userInfo.id}
        email:{userInfo.profileSetup}
      </div>
      <p>hai</p>
    </div>
  )
}

export default ChatPage