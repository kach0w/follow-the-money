import React from 'react'
import Head from 'next/head'
import { Navbar } from '../components/Navbar'

export default function issues() {

  return (
    <div>
      <Head>
        <title>Follow the Money</title>
        <link rel="icon" href="/favicon.png" sizes="any" />      
      </Head>  
      <div>
        <Navbar />
      </div>
      <div className='relative w-[69rem] h-[50rem] mx-auto text-center content-center'>
          <div className='absolute text-[2.5rem] inset-x-0 top-0'>
            <br></br>
          </div>
          <h1>The Issues</h1>
          <div className=''>
            <div className='float-right text-[5rem] text-[900]'>
              <a href="mailto:karsab343@gmail.com">+</a>
            </div>
          </div>
          <div className='grid grid-cols-3 absolute mt-[10rem] w-[69rem]'>
            <div className="w-[20rem] rounded-md mb-5 border-2 flex-col text-center content-center">
              <div id="card" className='p-6 rounded-t-md'>
                <h2 className='text-2xl text-[white] align-middle'>Artificial Intelligence</h2> 
              </div>
              <div className='rounded-b-lg p-6 bg-[#ffffff]'>
                  <div className='hover:underline p-6 text-[#3b82f6]'>
                      <a className="font-normal text-[1.3rem]" href="/posts?docname=ai">View the posts</a> 
                  </div>
              </div>
            </div>
            
            
          </div>
          
          
        </div>
      
    </div>
  )
}
