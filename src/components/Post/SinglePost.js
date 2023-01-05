import React from 'react';
import './Post.css'

const SinglePost = ({ post }) => {

    console.log(post)

    const { date, time, user_firstName, user_lastName, user_img, status } = post;

    return (
        <div>
            <div className='flex gap-1 mb-4 rounded status-container p-5'>
                <img className='h-10 w-10 rounded-full' src={user_img} alt="" />
                <div>
                    <div className='flex gap-1 text font-bold'>
                        <p>{user_firstName}</p>
                        <p>{user_lastName}</p>
                    </div>
                    <div className='flex gap-2 text-xs'>
                        <p>{date}</p>
                        <p>{time}</p>
                    </div>
                    <p className='mt-2 italic'>{status}</p>
                </div>
            </div>
        </div>
    );
};

export default SinglePost;