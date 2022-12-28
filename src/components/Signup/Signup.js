import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Signup = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();


    return (
        <div className='flex justify-center items-center'>
            <div className='w-2/6 p-7'>
                <h2 className='text-4xl text-center'>Sign Up</h2>
                <form onSubmit={handleSubmit()}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" {...register("name", { required: "Name is required" })} className="input input-bordered w-full" />

                        {/* error message  */}
                        {errors.name && <p className='text-red-500'>{errors.name?.message}</p>}
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
                            <span className="label-text">Age</span>
                        </label>
                        <input type="number" {...register("age", { required: "Age is required" })} className="input input-bordered w-full" />

                        {/* error message  */}
                        {errors.age && <p className='text-red-500'>{errors.age?.message}</p>}
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

                <button className='btn btn-outline w-full shadow-lg shadow-red-500/50'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Signup;