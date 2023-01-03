import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const Signin = () => {

    const { signIn, googleSignIn } = useContext(AuthContext);

    const { register, formState: { errors }, handleSubmit } = useForm();

    const [loginUserEmail, setLoginUserEmail] = useState('');

    const navigate = useNavigate();

    const handleLogin = data => {

        // ager login error reset 
        // setLoginError('');

        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                // console.log(user);

                setLoginUserEmail(user.email);

                // navigate(from, { replace: true });
                navigate('/');
                toast.success('Log In Successfully');
            })
            .catch(error => {
                console.error(error.message);
                // setLoginError(error.message);
                toast.error('Something going wrong');
            })
    }


    const signInWithGoogle = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                console.log(user);
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
                    // setCreatedUserEmail(user.email);
                    toast.success('added user successfully')
                }
            })

    }

    return (
        <div className='flex justify-center items-center'>
            <div className='w-2/6 p-7'>
                <h2 className='text-4xl text-center'>Log In</h2>
                <form onSubmit={handleSubmit()}>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" {...register("email", { required: "Email address is required" })} className="input input-bordered w-full" />
                        {errors.email && <p className='text-red-500'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be 6 charcter or longer" }
                        })} className="input input-bordered w-full" />
                        {errors.password && <p className='text-red-500'>{errors.password?.message}</p>}
                        <label className="label">
                            <span className="label-text">Forget Password</span>
                        </label>
                    </div>
                    <div>
                        {/* {
                            loginError &&
                            <p className='text-red-500'>{loginError}</p>
                        } */}
                    </div>
                    <input className='btn btn-primary w-full shadow-lg mb-2 shadow-cyan-500/50' value="Log in" type="submit" />
                </form>
                <p>New to Arrow Computer <Link to="/signup" className='text-primary'>Create a new account</Link></p>
                <div className="divider">OR</div>

                <button onClick={signInWithGoogle} className='btn btn-outline w-full shadow-lg shadow-red-500/50'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Signin;