import Image from 'next/image'
import Head from 'next/head'
import { Navbar } from '../components/Navbar'
import { useState } from 'react';
import { useEffect } from 'react';
import { db } from '../firebase'

export default function Home() {
  const [arr, setArr] = useState([]);
  const [dates, setDate] = useState([]);
  const [posts, setPosts] = useState([])

  const fetchIndependentExpenditures = async () => {
    await fetch("/api/route", {
      method: "GET",
    }).then((res) => res.json())
    .then((result) => {
      const arr = result.map((item) => {
        return item["@attributes"].pacshort + " - $" + item["@attributes"].amount
      })
      const dates = result.map((item) => {
        return item["@attributes"].date.slice(0, 10)
      })
      // console.log(arr)
      setArr(arr)
      setDate(dates)
    });
  }
  useEffect(() => {
    async function getPosts(){
      const commentsRef = db.collection('followthemoney').doc('ai').collection('posts');
      const snapshot = await commentsRef.get();
      const posts = snapshot.docs.map((doc) => ({
        id: doc.id,
        content: doc.data().content,
        author: doc.data().author
      }));
      // console.log(posts)
      setPosts(posts);
    }; 

    getPosts();
  }, []);
  return (
    <div>
      <Head>
        <title>Follow the Money</title>
        <link rel="icon" href="/favicon.png" sizes="any" />      
      </Head>  
      <div>
        <div>
        <Navbar />
        <div className='relative'>
          <div className='absolute text-[2.5rem] inset-x-0 top-0'>
            <br></br>
          </div>
          {/* cards */}
          <div className='absolute inset-y-0 left-0 w-[80rem] mx-auto' >
            <div className='mt-20 w-[15rem] p-6 text-left sm:w-[30rem] rounded-md shadow-[0_1px_4px_rgba(0,0,0,0.30)] mx-auto p-3 mb-[3vh] text-[0.5rem] sm:text-base'>
              <h3>What do we do?</h3>
              <br></br>
              <p>Up to you. On this website you can get involved with the issues, meet new people, or just learn about politics. It's up to you how <b>you</b> define Follow the Money. </p>
            </div>  
            <div className='mt-10 p-6 w-[15rem]  text-left sm:w-[30rem] rounded-md shadow-[0_1px_4px_rgba(0,0,0,0.30)] mx-auto p-3 mb-[3vh] text-[0.5rem] sm:text-base'>
              <h3>How it works?</h3>
              <br></br>
              <p>We use the OpenSecrets API to get access to tons of lobbying information. From that information we identify the top issues, companies, and lobbying interests and unite people who support or oppose them.</p>
            </div> 
            <div className='mt-10 p-6 w-[15rem] text-left sm:w-[30rem] rounded-md shadow-[0_1px_4px_rgba(0,0,0,0.30)] mx-auto p-3 mb-[3vh] text-[0.5rem] sm:text-base'>
              <h3>So what do we believe in?</h3>
              <br></br>
              <p>Not all lobbying is bad, crowdsourced funding from just regular people can spark dramatic change for good causes. However, the lobbying of a few, rich, very powerful companies frequently outweigh the interests of the many.</p>
            </div> 
          </div>
          {/* posts */}
          <div className='absolute inset-y-0 right-0 w-[80rem] mx-auto' >
            {/* latest post */}
            <div className='mt-20 w-[15rem] p-6 text-left sm:w-[25rem] rounded-md shadow-[0_1px_4px_rgba(0,0,0,0.30)] mx-auto p-3 mb-[3vh] text-[0.5rem] sm:text-base'>
                <h4 className='text-[#3b82f6]'>Latest Post in #ai</h4>
                <ul className='pt-2'>
                  {posts.slice(posts.length-1, posts.length).map((post) => (
                    <li key={post.id} className='text-[0.7rem]'>
                      <p className='text-[0.8rem]'>{post.content}</p>
                      <b><p className='text-[0.8rem] font-bold'>by @{post.author}</p></b>
                    </li>
                  ))}
                </ul>
            </div>
            {/* latest donors */}
            <div className='mt-10 w-[15rem] p-6 text-left sm:w-[25rem] rounded-md  shadow-[0_1px_4px_rgba(0,0,0,0.30)] mx-auto p-3 mb-[3vh] text-[0.5rem] sm:text-base'>
                <h4 className='text-[#3b82f6]'>Latest Independent Expenditures</h4>
                <button className="p-2 hover:underline" onClick={fetchIndependentExpenditures}>Click for latest list (Note: Latest 2022)</button>
                <ul className='text-[0.8rem] text-[#383838]'>
                  
                  {arr.slice(0, 10).map((arr, index) => (
                    arr ? (
                    <div>
                      <li className="font-bold" key={index}>{index+1}. {arr}</li>
                      <li className='pl-3' key={index}>{dates[index]}</li>
                    </div>
                    ) : (
                      <p>Loading</p>
                    )
                  ))}
                </ul> 

            </div>
          </div>
        </div>
        </div>
      </div> 
    </div>
  )
}
