import { useAppStore } from '@/store'
import React from 'react'

const ProfilePage = () => {
  const { userInfo } = useAppStore();
  return (
    <div>ProfilePage
      <p>email:{userInfo.email}</p>
    </div>
  )
}

export default ProfilePage