import React from 'react';

const Post = () => {


    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <textarea className="textarea textarea-bordered w-full h-32" placeholder="What's on your mind"></textarea>
            <br />
            <input className='btn' type="submit" value="submit"></input>
        </form>
    );
};

export default Post;