import React, {useState} from 'react'
import {useEffect} from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image'
import Head from 'next/head'
import { Navbar } from '../components/Navbar'
import {db} from '../firebase'
import user from '../assets/user.png'
import Commentform from '../components/Commentform';

const posts = ({docname}) => {
    const router = useRouter();
    const { query } = router;
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState("");
    const [noposts, setNoPosts] = useState("")
    useEffect(() => {
        async function getPosts(){
            const commentsRef = db.collection('followthemoney').doc(query.docname).collection('posts').orderBy('createdAt', 'desc');
            const snapshot = await commentsRef.get();
            if(snapshot.docs.length != 0){
                const posts = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    content: doc.data().content,
                    author: doc.data().author,
                    date: doc.data().createdAt.substring(0, 10),
                }));
                setPosts(posts);
                setNoPosts("")
            } else {
                setNoPosts("No posts found, add your own!")
            }
            
          }; 
      
          getPosts();
          if(query.docname == "ai"){
            setTitle("Artificial Intelligence")
          }
    })
    const handleNewPost = (post) => {
        setPosts([post, ...post]);
    };
    const togglePosts = () => {
        document.getElementById('posts').style = "display:block;"
        document.getElementById('resources').style = "display:none"
        document.getElementById('postslink').style = "text-decoration: underline"
        document.getElementById('resourcelink').style = "text-decoration: none;"
    }
    const toggleResources = () => {
        document.getElementById('resources').style = "display:block"
        document.getElementById('posts').style = "display:none"
        document.getElementById('postslink').style = "text-decoration: none;"
        document.getElementById('resourcelink').style = "text-decoration: underline"
    }
    const gradient = "background: linear-gradient(to right, #fff , #222";
    return (
        <div >
            <div className='absolute'>
                <Navbar />
            </div>
            <div className='pt-[5rem] text-center w-[20rem] sm:w-[50rem] mx-auto'>
                <div className="h-[4rem] sm:h-[10rem] rounded-t-md bg-gradient-to-r from-sky-500 to-indigo-500">
                </div>
                <div className='h-[5rem] p-2 shadow-[0_1px_4px_rgba(0,0,0,0.30)] rounded-b-md'>
                    <p className='inline-block float-left text-[1.5rem] sm:text-[2.5rem] pl-2'>{title}</p>
                    <p className='inline-block float-right'>{posts.length} posts</p>
                </div>
                <div className='text-left p-5'>
                    <a id="postslink" onClick={togglePosts} href="#" className='inline-block text-[1.2rem] underline-offset-8 text-[#3b82f6]'>Posts</a>&nbsp;&nbsp;&nbsp;&nbsp;
                    <a id="resourcelink" onClick={toggleResources} href="#" className='inline-block text-[1.2rem] hunderline-offset-8 text-[#3b82f6]'>Resources</a>
                </div>
                <hr></hr>
                <div id="posts" className='w-[20rem] sm:w-[50rem] mx-auto gap-x-1.5'>
                    {/* <h1 className='text-[2rem]'>Comments</h1> */}
                    <div className='sm:inline-block sm:w-[25rem] pb-[20rem]'>
                        <div>{noposts}</div>
                        <ul className='mx-auto'>
                            {posts.map((post) => (
                                <li key={post.id} className='mx-auto rounded-md mt-4 shadow-[0_1px_4px_rgba(0,0,0,0.30)] w-[20rem] p-3 text-left'>            
                                    <div className='relative w-[7rem]'>
                                        <div className='inline-block mt-1 mr-2'>
                                            <Image className="w-[2rem] h-[2rem]" src={user}></Image>
                                        </div>
                                        <div className='inline-block'>
                                            <b><p className='text-[1rem] text-slate-600 text-[900]'>{post.author}</p></b>
                                            <p className='text-[0.7rem] text-slate-600'>{post.date}</p>
                                        </div>    
                                    </div>
                                    <div className='mt-2'>
                                        <p className='text-[1rem]'>{post.content}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='sm:inline-block sm:w-[25rem] h-[25rem]'>
                        <Commentform onNewComment={handleNewPost} docname={query.docname} />
                    </div>
                    
                </div>
                </div>
                <div id="resources" className='hidden relative mt-5 mx-auto'>
                    <p>Contact me if you have a resource you would like to add: <a className="text-[#3b82f6] hover:underline" href="mailto:ratemyaps@gmail.com">karsab343@gmail.com</a></p>           
            </div>
            <br></br>
        </div>
    )
}

export default posts