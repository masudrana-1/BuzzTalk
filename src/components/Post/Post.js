import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { AuthContext } from '../../context/AuthProvider';

const Post = () => {

    const { user } = useContext(AuthContext);

    const { data: usr = [] } = useQuery({
        queryKey: ['usr'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    });

    // console.log(user)
    // console.log(usr[0])

    const date = new Date();

    console.log(date);

    const { first_name, last_name, img } = usr[0];

    const handleSubmit = (event) => {
        event.preventDefault();

        const post = event.target.post.value;

        console.log(post);

        const postData = {
            user_firstName: first_name,
            user_lastName: last_name,
            user_img: img,
            date: date
        }


    }

    return (
        <div>
            <div className='flex gap-3'>
                <div>
                    <img className='w-10 h-10 rounded-full' src={usr[0]?.img} alt="" />
                </div>
                <div className='w-full'>
                    <form onSubmit={handleSubmit}>
                        <textarea className="textarea textarea-bordered w-full h-32" name='post' placeholder="What's on your mind"></textarea>
                        <br />
                        <input className='btn' type="submit" value="submit"></input>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Post;