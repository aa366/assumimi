import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils';

enum CallStatus{
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHED="FINISHED"

}


const Agent = ({userName}:AgentProps) => {
    const isSpeaking = true ; 
    const callStatus = CallStatus.INACTIVE
    const messages = [
        "what your name?",
        "My name is Abdelwahab ,nice to meet you"
    ]
    const lastMessages = messages[messages.length -1]
  return (
    <>
    <div className='call-view'>
        <div className='card-interviewer'>

            <div className='avatar'>
  <Image 
            alt='vapi'
            src={"/ai-avatar.png"}
            width={65}
            height={54}  />
            {isSpeaking && <span className='animate-speak' />}
            </div>
            <h3>AI Interviewer</h3>
          
        </div>
        <div className='card-border'>
            <div className='card-content'>
                <Image 
                alt='user avatar'
                src={"/user-avatar.png"}
                width={540}
                height={540}
                className='rounded-full object-cover size-[120px]'/>
                <h3>{userName}</h3>
            </div>
        </div>
    </div>
        {messages.length > 0 && (
            <div className='transcript-border'>
                <div className=' transcript'>
                    <p className={cn("transition-opacity duration-500 opacity-0","animate-fadeIn opacity-100")}>
                        {lastMessages}
                    </p>

                </div>

            </div>
        )}
    <div className='w-full flex justify-center'>
    {callStatus !== "ACTIVE" ?(
        <button className=' relative btn-call'>
            <span className={cn("absolute animate-ping rounded-full opacity-75",callStatus !== "CONNECTING" & "hidden")}  />
                 
           
            <span>
   {callStatus ==="INACTIVE" || callStatus==="FINISHED"? "Call" :"..."}
            </span>
        </button>
    ):(
        <button className='btn-disconnect'>
            End
        </button>

    )}
    </div>
    </>
  )
}

export default Agent