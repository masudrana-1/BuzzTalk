import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast('Log Out', {
                    icon: '🥺',
                });
                navigate('/')
            })
            .catch(error => console.error(error))
    }


    const { data: usr = [] } = useQuery({
        queryKey: ['usr'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    });

    // console.log(user)

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to="/">Home</Link></li>
                        <li><Link>All post</Link></li>
                        <li><Link>Help</Link></li>
                        {
                            !user?.uid && <>
                                <li><Link to="/signin">Sign in</Link></li>
                                <li><Link to="/signup">Sign up</Link></li>
                            </>
                        }
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">BuzzTalk</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to="/">Home</Link></li>
                    <li><Link>All post</Link></li>
                    <li><Link>Help</Link></li>
                    {
                        !user?.uid && <>
                            <li><Link to="/signin">Sign in</Link></li>
                            <li><Link to="/signup">Sign up</Link></li>
                        </>
                    }
                </ul>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src={usr[0]?.img} />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <Link className="justify-between">
                                View Profile
                            </Link>
                        </li>
                        {
                            user?.uid && <li><Link onClick={handleLogOut}>Logout</Link></li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;