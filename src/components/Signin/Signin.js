import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Signin = () => {


    const { register, formState: { errors }, handleSubmit } = useForm();

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

                <button className='btn btn-outline w-full shadow-lg shadow-red-500/50'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Signin;