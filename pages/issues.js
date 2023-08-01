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
      
    </div>
  )
}
