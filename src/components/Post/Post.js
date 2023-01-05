import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
import { AuthContext } from '../../context/AuthProvider';
import SinglePost from './SinglePost';

const Post = () => {

    const { user } = useContext(AuthContext);

    const { data: usr = [], } = useQuery({
        queryKey: ['usr'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    });

    //  to get current date and time 

    const myDate = new Date();

    let daysList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let monthsList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Aug', 'Oct', 'Nov', 'Dec'];


    let date = myDate.getDate();
    let month = monthsList[myDate.getMonth()];
    let year = myDate.getFullYear();
    let day = daysList[myDate.getDay()];

    let today = `${date} ${month} ${year}, ${day}`;

    let amOrPm;
    let twelveHours = function () {
        if (myDate.getHours() > 12) {
            amOrPm = 'PM';
            let twentyFourHourTime = myDate.getHours();
            let conversion = twentyFourHourTime - 12;
            return `${conversion}`

        } else {
            amOrPm = 'AM';
            return `${myDate.getHours()}`
        }
    };
    let hours = twelveHours();
    let minutes = myDate.getMinutes();

    let currentTime = `${hours}:${minutes} ${amOrPm}`;

    // console.log(today + ' ' + currentTime);



    const handleSubmit = (event) => {
        event.preventDefault();

        const post = event.target.post.value;

        console.log(post);

        const postData = {
            user_firstName: usr[0]?.first_name,
            user_lastName: usr[0]?.last_name,
            user_img: usr[0]?.img,
            date: today,
            time: currentTime,
            status: post
        }
        fetch('http://localhost:5000/post', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                // authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(postData)
        })
            .then(res => res.json())
            .then(result => {
                // console.log(result);
                toast.success(`Post is added successfully`);
                refetch();
                // navigate('/dashboard/seller/products');
            })


    }


    const { data: posts = [], refetch } = useQuery({
        queryKey: ['post'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/post`);
            const data = await res.json();
            return data;
        }
    });

    // console.log(posts);

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
            <div className='mt-10'>
                {
                    posts?.map(post => <SinglePost key={post?._id} post={post}></SinglePost>)
                }
            </div>
        </div>
    );
};

export default Post;