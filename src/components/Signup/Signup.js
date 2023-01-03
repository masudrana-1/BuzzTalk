import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const Signup = () => {

    const { signUp, googleSignIn } = useContext(AuthContext);

    const { register, formState: { errors }, handleSubmit } = useForm();

    const [createdUserEmail, setCreatedUserEmail] = useState('');

    // img hosting key 
    // const imgHostingKey = process.env.REACT_APP_img_hosting_key;
    const imgHostingKey = "24bc95d0ef3bcdb20b0506314b5bbc84";

    const navigate = useNavigate();

    const handleSignUp = (data) => {
        // console.log(data);

        // setSignUpError('');

        signUp(data.email, data.password)
            .then(result => {
                const user = result.user;
                // console.log(user);

                // toast 
                toast.success("SignUp successfully");
                navigate('/');
                handleAddUser(data.email, data.first_name, data.last_name, data.Phone, data.gender, data.birthday, data.image[0]);

            })
            .catch(error => {
                console.error(error.message);
                // setSignUpError(error.message);
            })
    }



    const handleAddUser = (email, first_name, last_name, phone, gender, birthday, image) => {

        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    // console.log(imgData.data.url);
                    const user = {
                        first_name: first_name,
                        last_name: last_name,
                        email: email,
                        phone: phone,
                        gender: gender,
                        birthday: birthday,
                        img: imgData.data.url
                    }


                    // console.log(user)

                    // save user info to database 
                    fetch('http://localhost:5000/users', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            // authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(user)
                    })
                        .then(res => res.json())
                        .then(result => {
                            // console.log(result);
                            toast.success(`user is added successfully`);
                            // navigate('/dashboard/seller/products');
                        })

                }
            })

    }


    const signInWithGoogle = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                // console.log(user);
                // saveUserByGoogle(user.displayName, user.email);
                toast.success("SignUp successfully");
                navigate('/');
                addUserByGoogle(user.displayName, user.email, user.photoURL);
            })
            .catch(error => {
                console.log(error);
            })
    }


    const addUserByGoogle = (first_name, email, photo) => {
        const user = {
            first_name: first_name,
            last_name: "",
            email: email,
            phone: "",
            gender: "",
            birthday: "",
            img: photo
        };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(d => {

                if (d.acknowledged) {
                    setCreatedUserEmail(user.email);
                    toast.success('added user successfully')
                }
            })

    }

    return (
        <div className='flex justify-center items-center'>
            <div className='w-2/6 p-7'>
                <h2 className='text-4xl text-center mb-4'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className='flex gap-2'>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">First name</span>
                            </label>
                            <input type="text" {...register("first_name", { required: "Name is required" })} className="input input-bordered w-full" />

                            {/* error message  */}
                            {errors.first_name && <p className='text-red-500'>{errors.first_name?.message}</p>}
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Last name</span>
                            </label>
                            <input type="text" {...register("last_name", { required: "Name is required" })} className="input input-bordered w-full" />

                            {/* error message  */}
                            {errors.last_name && <p className='text-red-500'>{errors.last_name?.message}</p>}
                        </div>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" {...register("email", { required: "Email address is required" })} className="input input-bordered w-full" />

                        {/* error message  */}
                        {errors.email && <p className='text-red-500'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Phone</span>
                        </label>
                        <input type="number" {...register("Phone", { required: "Phone number is required" })} className="input input-bordered w-full" />

                        {/* error message  */}
                        {errors.Phone && <p className='text-red-500'>{errors.Phone?.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Select your gender</span>
                        </label>
                        <select {...register("gender")} className="input input-bordered w-full">
                            <option value="female">female</option>
                            <option value="male">male</option>
                            <option value="other">other</option>
                        </select>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Birth date</span>
                        </label>
                        <input type="date" {...register("birthday", { required: "Birthday is required" })} className="input input-bordered w-full" />

                        {/* error message  */}
                        {errors.birthday && <p className='text-red-500'>{errors.birthday?.message}</p>}
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Photo</span>
                        </label>
                        <input type="file" {...register("image", { required: "image is required" })} className="input w-full" />

                        {/* error message  */}
                        {errors.image && <p className='text-red-500'>{errors.image?.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register("password", {
                            required: "Password is required",

                            // minimum length 
                            minLength: { value: 6, message: "Password must be 6 chactar or longer" },

                            // password pattern 
                            pattern:
                            {
                                value: /(?=.*[A-Z].*[A-Z])/,
                                message: 'Password must have 2 upper case'
                            }

                        })} className="input input-bordered w-full" />

                        {/* error message  */}
                        {errors.password && <p className='text-red-500'>{errors.password?.message}</p>}
                        <label className="label">
                            <span className="label-text">Forget Password?</span>
                        </label>
                    </div>

                    {/* <div>
                        {
                            signUpError &&
                            <p className='text-red-500'>{signUpError}</p>
                        }
                    </div> */}
                    <input className='btn btn-primary w-full shadow-lg mb-2 shadow-cyan-500/50' value="Login" type="submit" />
                </form>
                <p>Already have an <Link to="/signin" className='text-primary'>Please Login</Link></p>
                <div className="divider">OR</div>

                <button onClick={signInWithGoogle} className='btn btn-outline w-full shadow-lg shadow-red-500/50'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Signup;