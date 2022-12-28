import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
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
    <RouterProvider router={router}>

    </RouterProvider>
  );
}

export default App;