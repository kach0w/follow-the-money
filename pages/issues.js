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
          <div className='grid grid-cols-3 absolute mt-[15rem] w-[69rem]'>
            <div className="w-[20rem] mb-5 border-2 rounded-md flex-col text-center content-center">
              <div id="card" className='p-6 text-[#c2c2c2]'>
                <h2 className='text-2xl text-[#222] align-middle'>Artificial Intelligence</h2> 
              </div>
              <div className='rounded-b-md bg-[white]'>
                  <div className='hover:underline p-6 text-[#3b82f6]'>
                  <a className="font-normal text-[1.5rem]" href="">posts</a> 
                  </div>
              </div>
            </div>
            <div className="w-[20rem] mb-5 border-2 rounded-md flex-col text-center content-center">
              <div id="card" className='p-6 text-[#c2c2c2]'>
                <h2 className='text-2xl text-[#222] align-middle'>Immigration</h2> 
              </div>
              <div className='rounded-b-md bg-[white]'>
                  <div className='hover:underline p-6 text-[#3b82f6]'>
                  <a className="font-normal text-[1.5rem]" href="">posts</a> 
                  </div>
              </div>
            </div>
            <div className="w-[20rem] mb-5 border-2 rounded-md flex-col text-center content-center">
              <div id="card" className='p-6 text-[#c2c2c2]'>
                <h2 className='text-2xl text-[#222] align-middle'>The Environment</h2> 
              </div>
              <div className='rounded-b-md bg-[white]'>
                  <div className='hover:underline p-6 text-[#3b82f6]'>
                  <a className="font-normal text-[1.5rem]" href="">posts</a> 
                  </div>
              </div>
            </div>
            <div className="w-[20rem] mb-5 border-2 rounded-md flex-col text-center content-center">
              <div id="card" className='p-6 text-[#c2c2c2]'>
                <h2 className='text-2xl text-[#222] align-middle'>Education</h2> 
              </div>
              <div className='rounded-b-md bg-[white]'>
                  <div className='hover:underline p-6 text-[#3b82f6]'>
                  <a className="font-normal text-[1.5rem]" href="">posts</a> 
                  </div>
              </div>
            </div>
            <div className="w-[20rem] mb-5 border-2 rounded-md flex-col text-center content-center">
              <div id="card" className='p-6 text-[#c2c2c2]'>
                <h2 className='text-2xl text-[#222] align-middle'>Military</h2> 
              </div>
              <div className='rounded-b-md bg-[white]'>
                  <div className='hover:underline p-6 text-[#3b82f6]'>
                  <a className="font-normal text-[1.5rem]" href="">posts</a> 
                  </div>
              </div>
            </div>
            <div className="w-[20rem] mb-5 border-2 rounded-md flex-col text-center content-center">
              <div id="card" className='p-6 text-[#c2c2c2]'>
                <h2 className='text-2xl text-[#222] align-middle'>Economy</h2> 
              </div>
              <div className='rounded-b-md bg-[white]'>
                  <div className='hover:underline p-6 text-[#3b82f6]'>
                  <a className="font-normal text-[1.5rem]" href="">posts</a> 
                  </div>
              </div>
            </div>
            <div className="w-[20rem] mb-5 border-2 rounded-md flex-col text-center content-center">
              <div id="card" className='p-6 text-[#c2c2c2]'>
                <h2 className='text-2xl text-[#222] align-middle'>Guns</h2> 
              </div>
              <div className='rounded-b-md bg-[white]'>
                  <div className='hover:underline p-6 text-[#3b82f6]'>
                  <a className="font-normal text-[1.5rem]" href="">posts</a> 
                  </div>
              </div>
            </div>
            <div className="w-[20rem] mb-5 border-2 rounded-md flex-col text-center content-center">
              <div id="card" className='p-6 text-[#c2c2c2]'>
                <h2 className='text-2xl text-[#222] align-middle'>Democracy</h2> 
              </div>
              <div className='rounded-b-md bg-[white]'>
                  <div className='hover:underline p-6 text-[#3b82f6]'>
                  <a className="font-normal text-[1.5rem]" href="">posts</a> 
                  </div>
              </div>
            </div>
          </div>
          
          
        </div>
      
    </div>
  )
}
