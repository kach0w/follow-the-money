import React from 'react'
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className='relative w-[100vw] align-middle'>
      <div className='absolute z-10 inset-y-0 left-0 w-[35rem]'>
        <a className="text-[#3b82f6]" href="/">
          <h2 className='inline text-[#3b82f6]'>Follow the Money</h2>
        </a>
      </div>
      <div className="absolute z-10 inset-y-0 right-0 pr-5 w-[35rem] space-x-8 pt-2 ">
          <a className="text-[#3b82f6]" href="/issues">Issues</a>
          <a className="text-[#3b82f6]" href="/politicians">Politicians</a>
          <a className="text-[#3b82f6]" href="/donors">Donors</a>
      </div>
    </div>
  )
}
