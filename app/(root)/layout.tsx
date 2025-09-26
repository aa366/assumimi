import React from 'react'
import { isAuthenticated } from '@/lib/actions/auth.action'
import { redirect } from 'next/navigation'
import NavBar from '@/components/Nav-Bar'
const RootLayout = async ({children}:{children:React.ReactNode}) => {

  const isUserAuthenticated = await isAuthenticated()
  if(!isUserAuthenticated) redirect("/sign-in")
  return (
    <div className='root-layout'>

    <NavBar />

      {children}
      
      
      </div>
  )
}

export default RootLayout