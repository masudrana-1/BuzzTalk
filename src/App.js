import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { Toaster } from 'react-hot-toast';
import Home from './components/Home/Home';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import Main from './layout/Main';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path: '/signin',
          element: <Signin></Signin>
        },
        {
          path: '/signup',
          element: <Signup></Signup>
        },
      ]
    }

  ])

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
      <Toaster></Toaster>
    </div>
  );
}

export default App;