import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const NavBar = () => {
  return (
   <nav>
      <Link href={'/'} className='flex items-center gap-2'>
      <Image 
      alt='Assumimi'
      src={"/logo.svg"}
      width={32}
      height={32}
      />
      <h2 className='text-primary-100'>Aussmimi</h2>
      
      </Link>
    </nav>
  )
}

export default NavBar