import React from 'react'
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className='relative w-[100vw] align-middle'>
        <a href="/">
            <div className='absolute inset-y-0 left-0 w-[35rem]'>
                <h2 className='inline'>Follow the Money</h2>
            </div>
        </a>
        <div className="absolute inset-y-0 right-0 pr-5 w-[35rem] space-x-8 pt-2 ">
            <Link className="" href="/issues">Issues</Link>
            <Link className="" href="/search">Search</Link>
            <Link className="" href="/top">Top Donors</Link>
        </div>
    </div>
  )
}
