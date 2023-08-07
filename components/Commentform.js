import React from 'react'
import { useEffect, useState } from 'react';
import { db } from '../firebase';

const Commentform = ({docname}) => {
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!author || !content || author==="kach0w") {
            return;
        }
        const commentData = {
            author,
            content,
            createdAt: new Date().toISOString(),
        };
        try {
            await db.collection('followthemoney').doc(docname).collection('posts').add(commentData);
            setAuthor('');
            setContent('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };
    return (
        <div className='mx-auto pt-5'>
            <form onSubmit={handleSubmit}>
                <label htmlFor="author" sm={4}>Name</label>
                <br></br>
                <input
                    className='rounded-md p-2 mt-2 text-[black] border-2 w-[15rem]'
                    type="text"
                    value={author}
                    onChange={(event) => setAuthor(event.target.value)}
                    id="author"
                    placeholder="Name" />
                <br></br>
                <br></br>
                <label htmlFor="content" sm={4}>Message</label>
                <br></br>
                <textarea
                    className='rounded-md p-2 text-[black] border-2 w-[15rem]'
                    id="content"
                    value={content}
                    placeholder="Start Typing..."
                    onChange={(e) => setContent(e.target.value)} ></textarea>
                <br></br>
                <br></br>
                <button className='bg-[#3b82f6] py-2 px-8 rounded-lg text-[white] hover:shadow-lg hover:text-slate-200'>Submit</button>
            </form>
            
        </div>
    )
}

export default Commentform