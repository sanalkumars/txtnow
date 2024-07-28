import { useAppStore } from '@/store'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ChatPage = () => {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();

  useEffect(()=>{
    if(!userInfo.profileSetup){
      toast("Please complete the profile to continue!");
      navigate('/profile');
    }
  },[userInfo,navigate]);

  return (
    <div>
     chatpage
    </div>
  )
}

export default ChatPage