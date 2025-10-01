import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import InterviewCard from '@/components/InterviewCard'
import {  getInterviewByUserId, getLatestInterview } from '@/lib/actions/general.action'
import { getCurrentUser } from '@/lib/actions/auth.action'

const Page =async () => {

  const user = await getCurrentUser() as User
  const [userInterviews,latestInterviews] = await Promise.all([
 await getInterviewByUserId(user.id),
 await getLatestInterview({userId:user.id}) 
  ])
  
   
 
  const hasPastInterviews = userInterviews!.length > 0;
  const hasUpComingInterviews = latestInterviews!.length > 0;
  

  return (
    <>
    <section className='card-cta'>
      <div className='flex flex-col gap-6 max-w-lg'>
        <h2>Get Interview-Ready With AI-Powered Practice & Feedback</h2>
        <p className=' text-lg'>Practice on real interview questions & get instant feedback </p>

        <Button asChild className='btn-promary max-sm:w-full' >
          <Link href={`/interview`}>Start an Interview</Link>
        </Button>
      </div>
      <Image 
      alt='MR Robot'
      src={"/robot.png"}
      width={400}
      height={400}
      loading='lazy'
      className='max-sm:hidden'
      />
     


    </section>

    <section className=' flex flex-col gap-6 mt-8'>

      <h2>Your Interviews</h2>
      <div className='interviews-section'>

        {hasPastInterviews?
        
      (  userInterviews?.map((interview)=>(
          <InterviewCard key={interview.id} {...interview}/>

        ))): ( 
          
           <p> You haven&apos;t taken any interview yet .</p> 
        )}

      </div>

    </section>
    
     <section className='flex flex-col gap-6 mt-8'>
      <h2>Take an Interview</h2>

        
       
    
    <div className='interviews-section'>
        {hasUpComingInterviews?
        
      (  latestInterviews?.map((interview)=>(
          <InterviewCard key={interview.id} {...interview}/>

        ))): ( 
          
            <p>There  are no interviews available</p> 
        )}

     
    
    </div>
      </section>
    </>
  )
}

export default Page