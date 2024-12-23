import { assets } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  return (
    <div className='flex flex-col bg-slate-100'>
      <div className='px-2 sm:pl-14 py-3 border border-black'>
         <Image src={assets.logo} width= {120} alt=''/>
      </div>
      <div className='w-28 sm:w-80 h-[100vh] relative py-12 border border-black'>
          <div className='w-[70%] sm:[80%] absolute right-0'>
          <Link href='/admin/AddProduct' className='flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]'>
             <Image src={assets.add_icon} alt='' width={25}/> <p className='hidden sm:block'>Add Blogs</p>
          </Link>
          <Link href='/admin/BlogList' className='mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]'>
             <Image src={assets.blog_icon} alt='' width={25}/> <p className='hidden sm:block'>Blog List</p>
          </Link>
          <Link href='/admin/Subscription' className='mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]'>
             <Image src={assets.email_icon} alt='' width={25}/> <p className='hidden sm:block'>Subscriptions</p>
          </Link>
          </div>
          
      </div>
    </div>
  )
}

export default Sidebar
